import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { WhatsappAccountRequest } from 'src/shared/models/requests/whatsapp-account/whatsapp-account.request';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';

@Injectable({
    providedIn: 'root'
})
export class WhatsappAccountService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-accounts`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async getRegisteredByCompany(): Promise<WhatsappAccountEntity> {
        const promise: Promise<WhatsappAccountEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappAccountEntity>(`${this.url}/registered`).subscribe(
                (response: WhatsappAccountEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: WhatsappAccountRequest): Promise<WhatsappAccountEntity> {
        const promise: Promise<WhatsappAccountEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappAccountEntity, WhatsappAccountRequest>(`${this.url}`, request).subscribe(
                (response: WhatsappAccountEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(request: WhatsappAccountRequest): Promise<WhatsappAccountEntity> {
        const promise: Promise<WhatsappAccountEntity> = new Promise((resolve: any, reject: any) => {
            this.put<WhatsappAccountEntity, WhatsappAccountRequest>(`${this.url}`, request).subscribe(
                (response: WhatsappAccountEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async destroy(id: string): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.delete<BooleanResponse>(`${this.url}/${id}`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
