import { Injectable } from "@angular/core";
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { NodeService } from "./node.service";



@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private service: NodeService) {

    }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.error instanceof ErrorEvent) {
                        console.log('error Event');
                    } else {
                        switch (error.status) {
                            case 419:
                                console.log('error 419');
                                let access_token = localStorage.getItem('access_token');
                                let refresh_token = localStorage.getItem('refresh_token');
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                                if (access_token && refresh_token) {
                                    this.service.refreshToken(access_token, refresh_token)
                                }
                        }
                    }
                } else {
                    console.log('error occured');
                }
                return throwError(() => {
                    console.log("Errrrrr");
                    
                    new Error(error.statusText);
                });
            })
        );
    }

}