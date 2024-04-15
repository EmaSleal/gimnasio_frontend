import { Component, OnInit } from '@angular/core';
import { Exercise } from '../../../core/models/exercise.interface';
import { TableComponent } from '../../../utils/table/table.component';
import { CardComponent } from '../../../utils/card/card.component';
import { ExerciseService } from '../../../core/service/exercise/exercise.service';

@Component({
  selector: 'app-list-exercise',
  standalone: true,
  imports: [TableComponent,CardComponent],
  templateUrl: './list-exercise.component.html',
  styleUrl: './list-exercise.component.scss'
})
export class ListExerciseComponent implements OnInit {
  constructor(private exerciseService: ExerciseService) { }

  ngOnInit(): void {
    this.exerciseService.getExercises().subscribe((exercises) => {
      this.dataSource = exercises;
    });
  }

  displayedColumns: string[] = [
    "name",
    "muscularGroup",
    "muscularLoad",

    "routineDay",
    "createdAt",
    "updatedAt",
  ];
  dataSource: Exercise[] = [];

}

