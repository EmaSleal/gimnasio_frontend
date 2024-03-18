import { trigger, transition, animate, keyframes, style } from '@angular/animations';
import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';

import { INavbarData, fadeInOut } from './helper';
import { navbarData } from './nav-data';
import { NavbarService } from 'src/app/service/navbar/navbar.service';


interface NavBarToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    fadeInOut,
    trigger('rotate', [
      transition(':enter' ,[
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)',offset:'0'}),
          style({transform: 'rotate(2turn)',offset:'1'}),
        ])
        )
      ])
    ])
  ]
})
export class NavbarComponent implements OnInit {
  navData:INavbarData[] = navbarData;
  @Input() collapsed = false;
  screenWidth = 0;
  @Output() onToggleNavbar :EventEmitter<NavBarToggle> = new EventEmitter();

  router: any;
  multiple: boolean = true;
  constructor(private navbarService: NavbarService) {}
  ngOnInit():void{
    this.screenWidth = window.innerWidth;
    this.isNavbarToggle();

  }
  
  
  @HostListener('window:resize',['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleNavbar.emit({collapsed: this.collapsed,screenWidth:this.screenWidth})
    }
  }

  public isNavbarToggle() {

    this.navbarService.visible.subscribe((visible: boolean) => {
      if (visible) {
        console.log("navbar visible");
        this.collapsed = !this.collapsed;
        this.onToggleNavbar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
      } else {
        console.log("navbar not visible");
        this.collapsed = false;
        this.onToggleNavbar.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth });
      }
    });
  }

  handleClick(item:INavbarData):void{
    this.shrinkItems(item);
    this.closeOtherItems(item);
    item.expanded = ! item.expanded;
  }
  shrinkItems(item:INavbarData):void{
    if(!this.multiple){
      for(let modelItem of this.navData){
        if(item!== modelItem && modelItem.expanded){
          modelItem.expanded=false;
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

  getActiveClass(data : INavbarData) : string{
    if (this.router && this.router.url) {
      return this.router.url.includes(data.routeLink) ? 'active' : '';
    }
    return '';
  }

  closeNavbar():void{
    this.collapsed = false;
    this.onToggleNavbar.emit({collapsed: this.collapsed,screenWidth:this.screenWidth})
  }
  


}
