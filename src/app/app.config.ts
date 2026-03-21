import { ApplicationConfig, } from '@angular/core';
import {provideRouter, withRouterConfig, withViewTransitions} from '@angular/router';
import { providePrimeNG } from 'primeng/config'; // prime ng
import Nora from '@primeng/themes/nora';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { TokenInterceptorProvider } from './core/interceptors/logging.interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withRouterConfig({canceledNavigationResolution:'computed',onSameUrlNavigation:'reload'}),
      withViewTransitions()// Enable view transitions
    ),
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),
    // inject the logging interceptor
    TokenInterceptorProvider,
    //prime ng added
    providePrimeNG({
        theme: {
          preset: Nora,
          options: {
            cssLayer: {
              name: 'primeng',
              order: 'theme, base, primeng'
            }
          }
        },

    })/* provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })*/
  ]
};
