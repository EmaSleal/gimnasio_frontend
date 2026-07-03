import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { Subject, debounceTime } from 'rxjs';
import { Workout } from '../../core/models/workout.interface';
import { WorkoutService } from '../../core/service/workout/workout.service';

/**
 * Shared workout search UI.
 *
 * `variant="overlay"`: full-viewport backdrop + floating panel, meant to be
 * mounted/unmounted (e.g. via `@if`) when a phone-size search icon is toggled.
 * `variant="inline"`: always-visible input with a dropdown results list,
 * meant for tablet/desktop toolbars where there is room for a permanent input.
 *
 * Both variants share the same fetch/filter/navigate logic so there is a
 * single implementation of "search workouts" in the app.
 */
@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [CommonModule, FormsModule, InputTextModule],
  templateUrl: './search-overlay.component.html',
  styleUrl: './search-overlay.component.scss',
})
export class SearchOverlayComponent implements OnInit, AfterViewInit {
  @Input() variant: 'overlay' | 'inline' = 'overlay';
  @Output() closed = new EventEmitter<void>();

  @ViewChild('searchInput') searchInputRef?: ElementRef<HTMLInputElement>;

  searchTerm = signal('');
  loading = signal(false);
  results = signal<Workout[]>([]);
  hasQuery = computed(() => this.searchTerm().trim().length > 0);

  private allWorkouts: Workout[] = [];
  private searchTerms$ = new Subject<string>();

  constructor(
    private readonly workoutService: WorkoutService,
    private readonly router: Router,
    private readonly destroyRef: DestroyRef
  ) {}

  ngOnInit(): void {
    this.workoutService.getWorkouts().subscribe((workouts) => {
      this.allWorkouts = workouts;
      // In case the user already typed something before the list arrived.
      this.applyFilter(this.searchTerm());
    });

    this.searchTerms$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((term) => this.applyFilter(term));
  }

  ngAfterViewInit(): void {
    if (this.variant === 'overlay') {
      // Autofocus the input once the floating panel is mounted.
      this.searchInputRef?.nativeElement.focus();
    }
  }

  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.loading.set(true);
    this.searchTerms$.next(value);
  }

  clear(): void {
    this.searchTerm.set('');
    this.results.set([]);
    this.loading.set(false);
    this.searchInputRef?.nativeElement.focus();
  }

  selectWorkout(workout: Workout): void {
    this.router.navigate(['exercise', workout.id], { state: { workout } });
    this.close();
  }

  close(): void {
    this.closed.emit();
  }

  onEscape(): void {
    if (this.variant === 'overlay') {
      this.close();
    }
  }

  private applyFilter(term: string): void {
    const normalized = term.trim().toLowerCase();
    if (!normalized) {
      this.results.set([]);
      this.loading.set(false);
      return;
    }
    this.results.set(
      this.allWorkouts.filter((w) => w.name?.toLowerCase().includes(normalized) ?? false)
    );
    this.loading.set(false);
  }
}
