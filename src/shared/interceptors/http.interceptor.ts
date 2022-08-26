import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PublicService } from '../services/public/public.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public constructor(private readonly publicService: PublicService) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap(
                () => {},
                (err: any) => {
                    if (err instanceof HttpErrorResponse && err.status === 401) this.publicService.logout();
                    return;
                }
            )
        );
    }
}
