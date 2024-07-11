import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../_services/storage.service';
import { TokenService } from '../_services/token.service';


@Injectable()
export class AuthAndCredentialsInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.tokenService.getToken()?.access_token;
    if (token) {
      console.log(("token: "+token));
      
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    req = req.clone({
      withCredentials: true
    });

    return next.handle(req);
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthAndCredentialsInterceptor, multi: true },
];