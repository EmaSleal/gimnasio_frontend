import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { Component, Input } from '@angular/core';

import { Router, RouterModule } from '@angular/router';
import { INavbarData, fadeInOut } from '../navbar/helper';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subnivel-menu',
  templateUrl: './subnivel-menu.component.html',
  styleUrls: ['./subnivel-menu.component.scss'],
  imports: [RouterModule,CommonModule],
  standalone: true,
  animations: [
    fadeInOut,
    trigger('submenu', [
      state(
        'hidden',
        style({
          height: '0',
          overflow: 'hidden',
        })
      ),
      state(
        'visible',
        style({
          height: '*',
        })
      ),
      transition('visible <=> hidden', [
        style({ overflow: 'hidden' }),
        animate('{{transitionParams}}'),
      ]),
      transition('void => *', animate(0)),
    ]),
  ],
})
export class SubnivelMenuComponent {
  @Input() data: INavbarData = {
    routeLink: '',
    icon: '',
    label: '',
    items: [],
  };
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean = false;

  constructor(public router: Router) {}

  ngOnInit(): void {}

  handleClick(item: any): void {
    console.log('handleClick2 called for', item);
    if (!this.multiple) {
      if (this.data.items && this.data.items.length > 0) {
        for (let modelItem of this.data.items) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
    }
    item.expanded = !item.expanded;
  }

  getActiveClass(item: INavbarData): string {
    return item.expanded && this.router.url
      ? 'active-sublevel'
      : '';
  }
}
