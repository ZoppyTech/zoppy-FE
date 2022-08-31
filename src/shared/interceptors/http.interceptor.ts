import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { PublicService } from '../services/public/public.service';
import { Storage } from '../utils/storage';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    public constructor(private readonly publicService: PublicService, private readonly storage: Storage) {}

    public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.storage.getToken()) request.headers.append(`Authorization`, `Bearer ${this.storage.getToken()}`);
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
