import { Component, Input, OnInit } from '@angular/core';
import {  BreakpointObserver } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [MatCardModule, MatIconModule, MatMenuModule, MatButtonModule]
})
export class CardComponent implements OnInit {


  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

  @Input() title: string | undefined;

}
