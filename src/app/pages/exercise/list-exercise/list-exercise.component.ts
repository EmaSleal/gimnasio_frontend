import { AfterViewInit, Component, HostListener, Input, OnChanges, OnInit } from '@angular/core';

import { TableComponent } from '../../../utils/table/table.component';
import { CardComponent } from '../../../utils/card/card.component';
import { WorkoutService } from '../../../core/service/workout/workout.service';
import { Workout } from '../../../core/models/workout.interface';
import { EditExerciseComponent } from '../edit-exercise/edit-exercise.component';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { AddExerciseComponent } from '../add-exercise/add-exercise.component';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-list-exercise',
  standalone: true,
  imports: [TableComponent,CardComponent, MatDialogModule,DataViewModule, TagModule, ButtonModule, CommonModule, ScrollPanelModule],
  templateUrl: './list-exercise.component.html',
  styleUrl: './list-exercise.component.scss'
})
export class ListExerciseComponent implements OnInit, AfterViewInit {
  constructor(private exerciseService: WorkoutService, private dialog: MatDialog, private router: Router, private cookieService: CookieService) { }
  sidebarHeight: number = 0;
  screenWidth: number | null = 0;

  ngOnInit(): void {
    this.exerciseService.getWorkouts().subscribe((exercises) => {
      this.dataSource = exercises;
      //console.log(this.dataSource);
    });
  }

  ngAfterViewInit() {
    //Seguira llamando a la cookie hasta que el valor sea diferente de 0
    this.cookieService.get('sidebarHeight') ? this.sidebarHeight = Number(this.cookieService.get('sidebarHeight')) : this.sidebarHeight = 0;
    console.log(this.sidebarHeight);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth; 
    this.cookieService.get('sidebarHeight') ? this.sidebarHeight = Number(this.cookieService.get('sidebarHeight')) : this.sidebarHeight = 0;
    console.log(this.sidebarHeight);
  }

  displayedColumns: string[] = [
    "name",
    "muscularGroup",
    "muscularLoad",
    "acciones"
  ];
  dataSource: Workout[] = [];

  addWorkout(){
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true; // El modal no se puede cerrar haciendo clic fuera de él
    dialogConfig.autoFocus = true;
    //le agrego al modal el 50% de la pantalla si la pantalla es suerior 768px

    // Abre el modal
    const dialogRef = this.dialog.open(AddExerciseComponent, dialogConfig);

    // Suscríbete a eventos del modal si es necesario
    dialogRef.afterClosed().subscribe((result) => {
      // Lógica después de cerrar el modal (si es necesario)
      //console.log('Modal cerrado con resultado:', result);
    });
  }

  editWorkout(workout: Workout) {
    console.log(workout);
    const dialogConfig = new MatDialogConfig();
    //dialogConfig.disableClose = true; // El modal no se puede cerrar haciendo clic fuera de él
    dialogConfig.autoFocus = true;
    dialogConfig.data = { workout }; // Puedes pasar datos al componente del modal si es necesario
    //le agrego al modal el 50% de la pantalla si la pantalla es suerior 768px
    if (window.innerWidth > 768) {
      dialogConfig.width = '38%';
    } 
    // Abre el modal
    const dialogRef = this.dialog.open(EditExerciseComponent, dialogConfig);

    // Suscríbete a eventos del modal si es necesario
    dialogRef.afterClosed().subscribe((result) => {
      // Lógica después de cerrar el modal (si es necesario)
      //console.log('Modal cerrado con resultado:', result);
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
        this.exerciseService.deleteWorkout(workout.id || "").then(() => {
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

    ChangeClass(muscularLoad: string) {
      if (muscularLoad === 'LOW') {
        return 'success';
      } else if (muscularLoad === 'MEDIUM') {
        return 'warning';
      } else if (muscularLoad === 'HIGH') {
        return 'danger';
      }
      return undefined;
    }
}

 