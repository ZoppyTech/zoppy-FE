import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { environment } from 'src/environments/environment';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { LoginRequest } from 'src/shared/models/requests/public/login.request';
import { RefreshTokenRequest } from 'src/shared/models/requests/public/refresh-token.request';
import { RegisterRequest } from 'src/shared/models/requests/public/register.request';
import { ResetPasswordRequest } from 'src/shared/models/requests/public/reset-password.request';
import { SendResetPasswordRequest } from 'src/shared/models/requests/public/send-request-password.request';
import { LoginResponse } from 'src/shared/models/responses/public/login.response';
import { ZipcodeResponse } from 'src/shared/models/responses/zipcode/zipcode.response';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class PublicService extends ApiService {
    public override url: string = `${environment.apiUrl}/api`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage,
        public confirmActionService: ConfirmActionService
    ) {
        super(http, router, storage);
    }

    public async fetchZipcode(zipcode: string): Promise<ZipcodeResponse> {
        const promise: Promise<ZipcodeResponse> = new Promise((resolve: any, reject: any) => {
            this.get<ZipcodeResponse>(`https://viacep.com.br/ws/${zipcode}/json/`).subscribe(
                (response: ZipcodeResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
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

    public async register(request: RegisterRequest): Promise<UserEntity> {
        const promise: Promise<UserEntity> = new Promise((resolve: any, reject: any) => {
            this.post<UserEntity, RegisterRequest>(`${this.url}/register`, request).subscribe(
                (response: UserEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public handleLoginSuccess(loginResponse: LoginResponse): void {
        this.storage.setToken(loginResponse.token);
        this.storage.setUser(loginResponse.user as UserEntity);
        this.storage.setCompany(loginResponse.company as CompanyEntity);
        this.router.navigate([Navigation.routes.dashboard]);
    }

    public logout(): void {
        this.storage.clearAll();
        this.router.navigate([Navigation.routes.login]);
    }

    public confirmLogout(): void {
        this.confirmActionService.open('Sair', 'Tem certeza que deseja sair?', (result: boolean) => {
            if (result) this.logout();
        });
    }
}
