import { Component, HostListener, Input, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  imports: [CardModule, MenuModule, ButtonModule]
})
export class CardComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
    this.checkBreakpoint();
  }

  @Input() title: string | undefined;
  @Input() menuItems: MenuItem[] = [];

  isMobile: boolean = false;

  checkBreakpoint(): void {
    if (typeof window !== 'undefined') {
      this.isMobile = window.matchMedia('(max-width: 768px)').matches;
    }
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkBreakpoint();
  }
}
