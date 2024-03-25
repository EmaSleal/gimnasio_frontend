import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
    // angular material provider
    // Add your Angular Material providers here


  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
