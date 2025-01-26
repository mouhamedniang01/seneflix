import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
//import {AuthService} from '../services/auth.service';
import {Observable} from 'rxjs';
import {AuthService} from '../services/auth/auth.service';
import {environment} from '../../environments/environment';

/*export function authInterceptor(req: HttpRequest<unknown>, next: HttpHandlerFn) {
  // Inject the current `AuthService` and use it to get an authentication token:
  const authToken = inject(AuthService).getAuthToken();
  // Clone the request to add the authentication header.
  const newReq = req.clone({
    headers: req.headers.append('Authorization', authToken),
  });
  return next(newReq);
}
*/
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private  readonly  authService:AuthService) {
  }

  public createAuthorizationHeader(headers: HttpHeaders,token:string):HttpHeaders {
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('accept', 'application/json');
    return headers;
  }

  // allows authorization with bearer token
  intercept(request: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    //bearer token inject
    const token:string =  this.authService.getAuthToken();
    console.log(token)
    const headers:HttpHeaders = this.createAuthorizationHeader(request.headers,token);
  console.log(headers);
    //send token in header while token isn't null
    if(token){
      let clone:HttpRequest<any> = request.clone({
        headers: request.headers.append('Authorization', 'Bearer '+token)
      });
      console.log(clone.headers);
      return handler.handle(clone);
    }
    return handler.handle(request);
  }
}

export  const  TokenInterceptorProvider = {
  provide:HTTP_INTERCEPTORS,
  useClass:LoggingInterceptor,
  multi:true,
}
