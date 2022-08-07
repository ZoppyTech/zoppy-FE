import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Navigation } from '../utils/navigation';
import { StringUtil } from '../utils/string.util';

export abstract class ApiService {
    public url: string = `${environment.apiUrl}/api`;

    public constructor(public readonly http: HttpClient, public readonly router: Router) {}

    public get<Response>(uri: string, params?: HttpParams, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = { headers: headers || new HttpHeaders(), params: params || new HttpParams() };
        return this.http.get(uri, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public post<Response, Request>(uri: string, request?: Request, params?: HttpParams, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = { headers: headers || new HttpHeaders(), params: params || new HttpParams() };
        return this.http.post(uri, request, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public put<Response, Request>(uri: string, request?: Request, params?: HttpParams, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = { headers: headers || new HttpHeaders(), params: params || new HttpParams() };
        return this.http.put(uri, request, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public delete<Response>(uri: string, params?: HttpParams, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = { headers: headers || new HttpHeaders(), params: params || new HttpParams() };
        return this.http.delete(uri, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public download<Response>(uri: string, params?: HttpParams | Object, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = {
            headers: headers || new HttpHeaders(),
            params: params || new HttpParams(),
            responseType: 'blob' as 'json'
        };
        return this.http.get(uri, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public downloadBase64<Response>(uri: string, params?: HttpParams | Object, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = {
            headers: headers || new HttpHeaders(),
            params: params || new HttpParams(),
            responseType: 'base64' as 'json'
        };
        return this.http.get(uri, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public downloadMany<Response>(uri: string, body: Object, headers?: HttpHeaders): Observable<Response> {
        const httpOptions: any = {
            headers: headers || new HttpHeaders({ 'Content-Type': 'application/json' }),
            responseType: 'blob' as 'json'
        };
        return this.http.post(uri, body, httpOptions).pipe(
            map((response: any) => {
                return response;
            }),
            catchError((error: any) => {
                return this.handleError(error);
            }),
            take(1)
        );
    }

    public handleError(responseError: any) {
        const errorMessage: string = Array.isArray(responseError.error?.message)
            ? StringUtil.convertArrayToText(responseError.error.message)
            : responseError.error.message || '';
        const error: ZoppyException = responseError.error as ZoppyException;
        error.message = errorMessage as string;
        if (error.statusCode === 401) {
            localStorage.clear();
            this.router.navigate([Navigation.routes.login]);
        }
        return throwError(error);
    }
}

export class ZoppyException extends Error {
    public declare statusCode: number;
    public declare message: string;
    public declare error: string;
}
