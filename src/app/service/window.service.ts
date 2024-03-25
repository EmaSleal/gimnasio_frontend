import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class WindowService {
  private screenWidth: number | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  getScreenWidth(): number | null {
    if (isPlatformBrowser(this.platformId) && !this.screenWidth) {
      this.screenWidth = window.innerWidth;
    }
    return this.screenWidth;
  }
}