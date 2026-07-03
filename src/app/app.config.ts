import { ApplicationConfig, APP_INITIALIZER, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideServiceWorker } from '@angular/service-worker';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { AuthInterceptorFn } from './core/interceptors/authInterceptor';
import { AuthService } from './core/service/auth/auth.service';
import { DialogService } from 'primeng/dynamicdialog';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(
      withFetch(),
      withInterceptors([AuthInterceptorFn])
    ),
    {
      provide: APP_INITIALIZER,
      useFactory: (authService: AuthService) => () => authService.getCurrentUserFromCookie(),
      deps: [AuthService],
      multi: true,
    },
    DialogService,
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ]
};


