import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LoginRequest } from 'src/shared/models/requests/public/login.request';
import { RefreshTokenRequest } from 'src/shared/models/requests/public/refresh-token.request';
import { ResetPasswordRequest } from 'src/shared/models/requests/public/reset-password.request';
import { SendResetPasswordRequest } from 'src/shared/models/requests/public/send-request-password.request';
import { LoginResponse } from 'src/shared/models/responses/public/login.response';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class PublicService extends ApiService {
    public override url: string = `${environment.apiUrl}/api`;

    public constructor(public override readonly http: HttpClient, public override readonly router: Router) {
        super(http, router);
    }

    public async login(request: LoginRequest): Promise<LoginResponse> {
        const promise: Promise<LoginResponse> = new Promise((resolve: any, reject: any) => {
            this.post<LoginResponse, LoginRequest>(`${this.url}/login`, request).subscribe(
                (response: LoginResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async sendResetPasswordEmail(request: SendResetPasswordRequest): Promise<boolean> {
        const promise: Promise<boolean> = new Promise((resolve: any, reject: any) => {
            this.post<boolean, SendResetPasswordRequest>(`${this.url}/send-reset-password-email`, request).subscribe(
                (response: boolean) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async resetPassword(request: ResetPasswordRequest): Promise<boolean> {
        const promise: Promise<boolean> = new Promise((resolve: any, reject: any) => {
            this.post<boolean, ResetPasswordRequest>(`${this.url}/reset-password`, request).subscribe(
                (response: boolean) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async refreshToken(request: RefreshTokenRequest): Promise<LoginResponse> {
        const promise: Promise<LoginResponse> = new Promise((resolve: any, reject: any) => {
            this.put<LoginResponse, RefreshTokenRequest>(`${this.url}/refresh-token`, request).subscribe(
                (response: LoginResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
