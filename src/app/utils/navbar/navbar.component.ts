import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { INavbarData, fadeInOut } from './helper';
import { navbarData } from './nav-data';
import { SubnivelMenuComponent } from '../subnivel-menu/subnivel-menu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarService } from '../../core/service/navbar/navbar.service';
import { WindowService } from '../../core/service/window.service';

interface NavBarToggle {
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [SubnivelMenuComponent, CommonModule, RouterModule],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter', [
        animate('1000ms',
          keyframes([
            style({ transform: 'rotate(0deg)', offset: '0' }),
            style({ transform: 'rotate(2turn)', offset: '1' }),
          ])
        )
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  navData: INavbarData[] = navbarData;
  @Input() collapsed = false;
  screenWidth = 0;
  @Output() onToggleNavbar: EventEmitter<NavBarToggle> = new EventEmitter();

  private readonly DESKTOP_SCREEN_WIDTH = 768; // Adjust this value as needed

  router: any;
  multiple: boolean = true;

  constructor(private windowService: WindowService, private navbarService: NavbarService) { }

  ngOnInit(): void {
    this.screenWidth = this.windowService.getScreenWidth() ?? 0;
    this.checkNavbarState();
    this.isNavbarToggle();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    this.checkNavbarState();
  }

  private checkNavbarState(): void {
    if (this.screenWidth > this.DESKTOP_SCREEN_WIDTH) {
      this.collapsed = true;
    } else {
      this.collapsed = false;
    }
    this.onToggleNavbar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }

  public isNavbarToggle() {
    this.navbarService.visible.subscribe((visible: boolean) => {
      if (visible && this.screenWidth <= this.DESKTOP_SCREEN_WIDTH) {
        this.collapsed = !this.collapsed;
      } 
      else if (!visible && this.screenWidth > this.DESKTOP_SCREEN_WIDTH) {
        console.log('Navbar is already collapsed');
        this.collapsed = true;
      }
      else {
        this.collapsed = false;
      }
      this.onToggleNavbar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
    });
  }

  handleClick(item: INavbarData): void {
    this.shrinkItems(item);
    this.closeOtherItems(item);
    item.expanded = !item.expanded;
  }

  shrinkItems(item: INavbarData): void {
    if (!this.multiple) {
      for (let modelItem of this.navData) {
        if (item !== modelItem && modelItem.expanded) {
          modelItem.expanded = false;
        }
      }
    }
  }

  closeOtherItems(currentItem: INavbarData): void {
    for (const item of this.navData) {
      if (item !== currentItem) {
        item.expanded = false;
      }
    }
  }

  getActiveClass(data: INavbarData): string {
    if (this.router && this.router.url) {
      return this.router.url.includes(data.routeLink) ? 'active' : '';
    }
    return '';
  }

  closeNavbar(): void {
    this.collapsed = false;
    this.onToggleNavbar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
  }
}
