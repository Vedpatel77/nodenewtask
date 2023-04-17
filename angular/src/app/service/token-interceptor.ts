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
                                this.service.accessToken().subscribe((res: any) => {
                                    console.log(res.token);
                                    localStorage.setItem('access_token' , res.token)
                                });


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