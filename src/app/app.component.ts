import {
  Component,
  HostListener,
  OnInit,
  ViewChild,
  computed,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { RouterOutlet } from '@angular/router';

import { Sidebar, SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';
import { FilterMatchMode, MenuItem, PrimeNGConfig, PrimeTemplate } from 'primeng/api';
import { WindowService } from './core/service/window.service';
import { PanelMenuModule } from 'primeng/panelmenu';
import { INavbarData } from './utils/navbar/helper';
import { navbarData } from '../app/utils/navbar/nav-data';
import { AvatarModule } from 'primeng/avatar';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { DockModule } from 'primeng/dock';
import { AuthService } from './core/service/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { UpdateNotificationComponent } from './utils/update-notification/update-notification.component';
import { SearchOverlayComponent } from './utils/search-overlay/search-overlay.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    SidebarModule,
    ButtonModule,
    ToolbarModule,
    MenuModule,
    PrimeTemplate,
    PanelMenuModule,
    RippleModule,
    AvatarModule,
    StyleClassModule,
    DockModule,
    UpdateNotificationComponent,
    SearchOverlayComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  @ViewChild('sidebarRef') sidebarRef!: Sidebar;
  title = 'gym-frontend';
  isAuthenticated = toSignal(
    this.authService.currentUser$.pipe(map(u => u !== null)),
    { initialValue: false }
  );
  username = toSignal(
    this.authService.currentUser$.pipe(map(u => u?.username ?? '')),
    { initialValue: '' }
  );
  avatarLetter = computed(() => (this.username()?.charAt(0) || 'U').toUpperCase());
  userMenuItems: MenuItem[] = [
    {
      label: 'Cerrar sesión',
      icon: 'pi pi-power-off',
      command: () => this.logout(),
    },
  ];
  sidebarVisible: boolean = false;
  searchOverlayVisible: boolean = false;
  screenWidth = signal<number>(0);
  sidebarHeight = signal<number>(0);
  routes = signal<MenuItem[]>([
    {
      icon: 'fal fa-sharp fa-regular fa-globe',
      label: 'Ejercicio',
      routerLink: 'exercise/list',
    },
    {
      icon: 'fal fa-sharp fa-solid fa-city',
      label: 'Usuario',
      routerLink: 'user/list',
    },
    {
      icon: 'fal fa-sharp fa-solid fa-city',
      label: 'Grupo Muscular',
      routerLink: 'muscular-group/list',
    },
    {
      icon: 'fal fa-sharp fa-solid fa-city',
      label: 'Rutina',
      routerLink: 'workout-plan/list',
    },
  ]);
  constructor(
    private authService: AuthService,
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

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth.set(event.target.innerWidth);
    this.updateSidebarHeight();
  }

  logout() {
    this.authService.logout();
  }
}
