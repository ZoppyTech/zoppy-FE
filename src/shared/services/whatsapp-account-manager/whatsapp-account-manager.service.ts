import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { WhatsappAccountManagerRequest } from 'src/shared/models/requests/whatsapp-account-manager/whatsapp-account-manager.request';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';

@Injectable({
    providedIn: 'root'
})
export class WhatsappAccountManagerService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-accounts`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(accountId: string): Promise<Array<WhatsappAccountManagerEntity>> {
        const promise: Promise<Array<WhatsappAccountManagerEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappAccountManagerEntity>>(`${this.url}/${accountId}/managers`).subscribe(
                (response: Array<WhatsappAccountManagerEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findById(accountId: string, id: string): Promise<WhatsappAccountManagerEntity> {
        const promise: Promise<WhatsappAccountManagerEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappAccountManagerEntity>(`${this.url}/${accountId}/managers/${id}`).subscribe(
                (response: WhatsappAccountManagerEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findByLoggedUser(accountId: string): Promise<WhatsappAccountManagerEntity> {
        const promise: Promise<WhatsappAccountManagerEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappAccountManagerEntity>(`${this.url}/${accountId}/managers/logged-user`).subscribe(
                (response: WhatsappAccountManagerEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(accountId: string, request: WhatsappAccountManagerRequest): Promise<WhatsappAccountManagerEntity> {
        const promise: Promise<WhatsappAccountManagerEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappAccountManagerEntity, WhatsappAccountManagerRequest>(`${this.url}/${accountId}/managers`, request).subscribe(
                (response: WhatsappAccountManagerEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(accountId: string, request: WhatsappAccountManagerRequest): Promise<WhatsappAccountManagerEntity> {
        const promise: Promise<WhatsappAccountManagerEntity> = new Promise((resolve: any, reject: any) => {
            this.put<WhatsappAccountManagerEntity, WhatsappAccountManagerRequest>(`${this.url}/${accountId}/managers`, request).subscribe(
                (response: WhatsappAccountManagerEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async destroy(accountId: string, id: string): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.delete<BooleanResponse>(`${this.url}/${accountId}/managers/${id}`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
