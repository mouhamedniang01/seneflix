import {Injectable} from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {Observable} from 'rxjs';
import { AuthService } from '../services/auth/auth.service';



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
    const headers:HttpHeaders = this.createAuthorizationHeader(request.headers,token);

    //send token in header while token isn't null
    if(token){
      let clone:HttpRequest<any> = request.clone({
        headers: request.headers.append('Authorization', 'Bearer '+token)
      });
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
