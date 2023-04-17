import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private cookieService: CookieService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const token = this.cookieService.get('jwt')
    const token = localStorage.getItem('access_token')

    if (token) {
      const clone = req.clone({
        headers: req.headers.set("Authorization",
        "Bearer "+token)
      });
      return next.handle(clone);
    } else {
      return next.handle(req);
    }
  }
}
