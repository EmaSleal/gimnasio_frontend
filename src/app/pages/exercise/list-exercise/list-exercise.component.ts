import { Component, OnInit } from '@angular/core';

import { TableComponent } from '../../../utils/table/table.component';
import { CardComponent } from '../../../utils/card/card.component';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { Workout } from '../../../core/models/workout.interface';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-exercise',
  standalone: true,
  imports: [TableComponent,CardComponent, MatDialogModule],
  templateUrl: './list-exercise.component.html',
  styleUrl: './list-exercise.component.scss'
})
export class ListExerciseComponent implements OnInit {
  constructor(private exerciseService: WorkoutService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.exerciseService.getWorkouts().subscribe((exercises) => {
      this.dataSource = exercises;
      //console.log(this.dataSource);
    });
  }

  displayedColumns: string[] = [
    "name",
    "muscularGroup",
    "muscularLoad",
    "acciones"
  ];
  dataSource: Workout[] = [];

  editWorkout(workout: Workout) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true; // El modal no se puede cerrar haciendo clic fuera de él
    dialogConfig.autoFocus = true;
    dialogConfig.data = { workout }; // Puedes pasar datos al componente del modal si es necesario

    // Abre el modal
    const dialogRef = this.dialog.open(EditExerciseComponent, dialogConfig);

    // Suscríbete a eventos del modal si es necesario
    dialogRef.afterClosed().subscribe((result) => {
      // Lógica después de cerrar el modal (si es necesario)
      console.log('Modal cerrado con resultado:', result);
    });
  }

  deleteWorkout(workout: Workout) {
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
        this.exerciseService.deleteWorkout(workout.id).then(() => {
          this.dataSource = this.dataSource.filter((u) => u.id !== workout.id);
          Swal.fire('¡Eliminado!', 'El ejercicio ha sido eliminado.', 'success');
        });
      }
    });
  }

  selectWorkout(workout: any) {
    //envio a la ruta de 'workout' con la data del usuario seleccionado
    this.router.navigate(['exercise', workout.id], { state: { workout } });
    }
}

 