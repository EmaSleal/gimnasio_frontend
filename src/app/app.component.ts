import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  signal,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './utils/navbar/navbar.component';
import { FooterComponent } from './utils/footer/footer.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { FilterMatchMode, MenuItem, PrimeNGConfig } from 'primeng/api';
import { WindowService } from './core/service/window.service';
import { InputTextModule } from 'primeng/inputtext';
import { PanelMenuModule } from 'primeng/panelmenu';
import { INavbarData } from './utils/navbar/helper';
import { navbarData } from '../app/utils/navbar/nav-data';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DockModule } from 'primeng/dock';
import { LoginService } from './core/service/login/login.service';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    MatSidenavModule,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    SplitButtonModule,
    InputTextModule,
    PanelMenuModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    DockModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('slideToggle', [
      state('closed', style({ height: '0px', overflow: 'hidden' })),
      state('open', style({ height: '*', overflow: 'hidden' })),
      transition('closed <=> open', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class AppComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  title = 'gym-frontend';
  sidebarVisible: boolean = false;
  items: MenuItem[] | undefined;
  screenWidth = signal<number>(0);
  sidebarHeight = signal<number>(0);
  routes = signal<MenuItem[]>([
    {
      icon: 'fal fa-sharp fa-regular fa-globe',
      label: 'Ejercicio',
      items: [
        { routerLink: 'exercise/list', label: 'Mostrar Ejercicio' },
        { routerLink: 'exercise', label: 'Agregar Ejercicio' },
      ],
    },
    {
      icon: 'fal fa-sharp fa-solid fa-city',
      label: 'Usuario',
      items: [
        { routerLink: 'user/list', label: 'Listar Usuarios' },
        { routerLink: 'user', label: 'Agregar Usuario' },
      ],
    },
    {
      icon: 'fal fa-sharp fa-solid fa-city',
      label: 'Grupo Muscular',
      items: [
        {
          routerLink: 'muscular-group/list',
          label: 'Listar Grupos Musculares',
        },
        { routerLink: 'muscular-group', label: 'Agregar Grupo Muscular' },
      ],
    },
    {
      icon: 'fal fa-sharp fa-solid fa-city',
      label: 'Rutina',
      items: [
        { routerLink: 'workout-plan/list', label: 'Listar Rutinas' },
        { routerLink: 'workout-plan', label: 'Agregar Rutina' },
      ],
    },
  ]);
  constructor(
    private loginservice: LoginService,
    private primengConfig: PrimeNGConfig,
    private windowService: WindowService,
    private cookieService: CookieService
  ) {
    this.primengConfig.csp.set({ nonce: '...' });
  }
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.screenWidth.set(window.innerWidth);
      this.updateSidebarHeight();
    }

    this.primengConfig.ripple = true;

    this.primengConfig.zIndex = {
      modal: 1100, // dialog, sidebar
      overlay: 1000, // dropdown, overlaypanel
      menu: 1000, // overlay menus
      tooltip: 1100, // tooltip
    };

    this.primengConfig.filterMatchModeOptions = {
      text: [
        FilterMatchMode.STARTS_WITH,
        FilterMatchMode.CONTAINS,
        FilterMatchMode.NOT_CONTAINS,
        FilterMatchMode.ENDS_WITH,
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
      ],
      numeric: [
        FilterMatchMode.EQUALS,
        FilterMatchMode.NOT_EQUALS,
        FilterMatchMode.LESS_THAN,
        FilterMatchMode.LESS_THAN_OR_EQUAL_TO,
        FilterMatchMode.GREATER_THAN,
        FilterMatchMode.GREATER_THAN_OR_EQUAL_TO,
      ],
      date: [
        FilterMatchMode.DATE_IS,
        FilterMatchMode.DATE_IS_NOT,
        FilterMatchMode.DATE_BEFORE,
        FilterMatchMode.DATE_AFTER,
      ],
    };

    this.primengConfig.setTranslation({
      accept: 'Accept',
      reject: 'Cancel',
      //translations
    });

    // use items to user menu
    this.items = [
      {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [
          {
            label: 'New',
            icon: 'pi pi-fw pi-plus',
            items: [
              { label: 'User', icon: 'pi pi-fw pi-user-plus' },
              { label: 'Filter', icon: 'pi pi-fw pi-filter' },
            ],
          },
          { label: 'Open', icon: 'pi pi-fw pi-folder' },
          { separator: true },
          { label: 'Quit', icon: 'pi pi-fw pi-times' },
        ],
      },
      {
        label: 'Edit',
        icon: 'pi pi-pi pi-pencil',
        items: [
          { label: 'Delete', icon: 'pi pi-fw pi-trash' },
          { label: 'Refresh', icon: 'pi pi-fw pi-refresh' },
        ],
      },
      // logout
      {
        label: 'Logout',
        icon: 'pi pi-fw pi-power-off',
        command: () => {
          this.logout();
        },
      },
    ];
    //this.updateSidebarHeight();

    
  }
  closeCallback(e: any): void {
    this.sidebarRef.close(e);
  }

  updateSidebarHeight() {
    //get the height of the element with the class name 'p-toolbar'
    const toolbarHeight = document.querySelector('.p-toolbar')?.clientHeight || 0;
    const availableHeight = window.innerHeight - toolbarHeight;
    console.log(availableHeight);
    this.sidebarHeight.set(availableHeight);
    this.cookieService.set('sidebarHeight', availableHeight.toString());
  }

  openMenuIndex = signal<number | null>(null);

  toggleMenu(index: number) {
    if (this.openMenuIndex() === index) {
      this.openMenuIndex.set(null);
    } else {
      this.openMenuIndex.set(index);
    }
  }

  isOpen(index: number): boolean {
    return this.openMenuIndex() === index;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth.set(event.target.innerWidth);
    this.updateSidebarHeight();
  }

  logout() {
    this.loginservice.logout();
  }
}
