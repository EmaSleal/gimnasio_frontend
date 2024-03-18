import { Component, Input, OnInit } from '@angular/core';
import {  BreakpointObserver } from '@angular/cdk/layout';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';


@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  imports: [MatCardModule, MatIconModule, MatMenuModule]
})
export class CardComponent implements OnInit {


  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
  }

  @Input() title: string | undefined;



}
