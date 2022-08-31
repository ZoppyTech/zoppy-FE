import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@lucarrloliveira/confirm-action';
import { environment } from 'src/environments/environment';
import { ExternalTokenEntity } from 'src/shared/models/entities/external-token.entity';
import { ExternalTokenRequest } from 'src/shared/models/requests/external-token/external-token.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class ExternalTokenService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/tokens`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async create(request: ExternalTokenRequest): Promise<ExternalTokenEntity> {
        const promise: Promise<ExternalTokenEntity> = new Promise((resolve: any, reject: any) => {
            this.post<ExternalTokenEntity, ExternalTokenRequest>(`${this.url}`, request).subscribe(
                (response: ExternalTokenEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findLatestActive(): Promise<ExternalTokenEntity> {
        const promise: Promise<ExternalTokenEntity> = new Promise((resolve: any, reject: any) => {
            this.get<ExternalTokenEntity>(`${this.url}/latest`).subscribe(
                (response: ExternalTokenEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async inactivate(id: string): Promise<ExternalTokenEntity> {
        const promise: Promise<ExternalTokenEntity> = new Promise((resolve: any, reject: any) => {
            this.put<ExternalTokenEntity, ExternalTokenRequest>(`${this.url}/inactivate/${id}`).subscribe(
                (response: ExternalTokenEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async activate(id: string): Promise<ExternalTokenEntity> {
        const promise: Promise<ExternalTokenEntity> = new Promise((resolve: any, reject: any) => {
            this.put<ExternalTokenEntity, ExternalTokenRequest>(`${this.url}/activate/${id}`).subscribe(
                (response: ExternalTokenEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
