import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import {provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { isDevMode } from '@angular/core';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', { enabled: !isDevMode() }),
  ],
}).catch((err) => console.error(err));
