import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config'; // prime ng
import Aura from '@primeng/themes/aura';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi} from '@angular/common/http';
import { TokenInterceptorProvider } from './core/interceptors/logging.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      // DI-based interceptors must be explicitly enabled.
      withInterceptorsFromDi(),
    ),
    // inject the logging interceptor
    TokenInterceptorProvider,
    //prime ng added
    providePrimeNG({
        theme: {
            preset: Aura
        }
    })
  ]
};
