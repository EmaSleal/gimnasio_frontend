import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import Swal from 'sweetalert2';

import { WorkoutPlanService } from '../../../core/service/workout-plan/workout-plan.service';
import { AuthService } from '../../../core/service/auth/auth.service';
import { WorkoutPlan } from '../../../core/models/workout-plan.interface';
import { EditRoutineComponent } from '../edit-workout-plan/edit-routine.component';

@Component({
  selector: 'app-list-routine',
  standalone: true,
  imports: [DynamicDialogModule, DataViewModule, TagModule, ButtonModule, CommonModule, ScrollPanelModule],
  templateUrl: './list-routine.component.html',
  styleUrl: './list-routine.component.scss'
})
export class ListRoutineComponent implements OnInit {
  constructor(
    private workoutPlanService: WorkoutPlanService,
    private authService: AuthService,
    private dialogService: DialogService,
    private router: Router
  ) { }

  dataSource: WorkoutPlan[] = [];

  ngOnInit(): void {
    this.refresh();
  }

  refresh(): void {
    const currentUser = this.authService.currentUser;
    const request$ = this.authService.isTrainer && currentUser
      ? this.workoutPlanService.findByTrainer(currentUser.id)
      : this.workoutPlanService.getWorkoutPlans();

    request$.subscribe((plans) => {
      this.dataSource = plans;
    });
  }

  statusSeverity(status: string): 'success' | 'info' | 'warning' | 'danger' | undefined {
    switch (status) {
      case 'ACTIVE':
        return 'success';
      case 'COMPLETED':
        return 'info';
      case 'SUSPENDED':
        return 'warning';
      case 'CANCELLED':
        return 'danger';
      default:
        return undefined;
    }
  }

  goToCreate(): void {
    this.router.navigate(['workout-plan']);
  }

  editPlan(plan: WorkoutPlan): void {
    const width = window.innerWidth > 768 ? '38%' : '90%';
    const ref = this.dialogService.open(EditRoutineComponent, {
      data: { workoutPlan: plan },
      header: 'Editar Rutina',
      width,
    });

    ref.onClose.subscribe((result) => {
      if (result) {
        this.refresh();
      }
    });
  }

  deletePlan(plan: WorkoutPlan): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.workoutPlanService.deleteWorkoutPlan(plan.id!).subscribe({
          next: () => {
            this.dataSource = this.dataSource.filter((p) => p.id !== plan.id);
            Swal.fire('¡Eliminado!', 'La rutina ha sido eliminada.', 'success');
          }
        });
      }
    });
  }

  selectPlan(plan: WorkoutPlan): void {
    this.router.navigate(['workout-plan', plan.id], { state: { plan } });
  }
}
