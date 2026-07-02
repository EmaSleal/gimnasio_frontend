import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-avatar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnChanges {
  @Input() name: string = '';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() imageUrl?: string;

  @HostBinding('class')
  get hostClass(): string {
    return this.size;
  }

  /** Tracks whether the image failed to load so we can fall back to initials. */
  private _imageError = false;

  /**
   * Getter so the template always reads the current imageUrl without relying
   * on ngOnChanges being triggered by direct property assignment in tests.
   */
  get showImage(): boolean {
    return !!this.imageUrl && !this._imageError;
  }

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['imageUrl']) {
      this._imageError = false;
    }
  }

  get initials(): string {
    const words = (this.name || '').trim().split(/\s+/).filter(Boolean);
    if (words.length === 0) return '';
    const first = words[0][0]?.toUpperCase() || '';
    const last = words[words.length - 1][0]?.toUpperCase() || '';
    return first + last;
  }

  onImageError(): void {
    this._imageError = true;
    this.cdr.markForCheck();
  }
}
