import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../utils/card/card.component';
import { MuscularGroup } from '../../../core/models/muscular-group.interface';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { MuscularGroupService } from '../../../core/service/muscular-group/muscular-group.service';
import { TableComponent } from '../../../utils/table/table.component';

@Component({
  selector: 'app-muscular-group',
  standalone: true,
  imports: [CardComponent, TableComponent],
  templateUrl: './muscular-group.component.html',
  styleUrl: './muscular-group.component.scss'
})
export class MuscularGroupComponent implements OnInit{



  muscularGroup: MuscularGroup | undefined;

  constructor(private route: ActivatedRoute, private muscularGroupService: MuscularGroupService, private router: Router) {}


  ngOnInit(): void {
    // Obtengo el id del usuario de la URL
    const id = this.route.snapshot.paramMap.get('id') as string;
    // Obtengo el usuario por id
    this.muscularGroupService.getMuscularGroup(id).then((muscularGroup) => {
      this.muscularGroup = muscularGroup;
      console.log(this.muscularGroup);
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
    selectExercise(exercise: any) {
    //envio a la ruta de 'muscularGroup' con la data del usuario seleccionado
    this.router.navigate(['exercise', exercise.id], { state: { exercise } });
    }
}
