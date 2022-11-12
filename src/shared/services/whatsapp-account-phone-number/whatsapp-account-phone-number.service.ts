import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { WhatsappAccountPhoneNumberEntity } from 'src/shared/models/entities/whatsapp-account-phone-number.entity';
import { WhatsappAccountPhoneNumberRequest } from 'src/shared/models/requests/whatsapp-account-phone-number/whatsapp-account-phone-number.request';

@Injectable({
    providedIn: 'root'
})
export class WhatsappAccountPhoneNumberService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-accounts`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(accountId: string): Promise<Array<WhatsappAccountPhoneNumberEntity>> {
        const promise: Promise<Array<WhatsappAccountPhoneNumberEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappAccountPhoneNumberEntity>>(`${this.url}/${accountId}/phone-numbers`).subscribe(
                (response: Array<WhatsappAccountPhoneNumberEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findById(accountId: string, id: string): Promise<WhatsappAccountPhoneNumberEntity> {
        const promise: Promise<WhatsappAccountPhoneNumberEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappAccountPhoneNumberEntity>(`${this.url}/${accountId}/phone-numbers/${id}`).subscribe(
                (response: WhatsappAccountPhoneNumberEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findDefault(accountId: string): Promise<WhatsappAccountPhoneNumberEntity> {
        const promise: Promise<WhatsappAccountPhoneNumberEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappAccountPhoneNumberEntity>(`${this.url}/${accountId}/phone-numbers/default`).subscribe(
                (response: WhatsappAccountPhoneNumberEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(accountId: string, request: WhatsappAccountPhoneNumberRequest): Promise<WhatsappAccountPhoneNumberEntity> {
        const promise: Promise<WhatsappAccountPhoneNumberEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappAccountPhoneNumberEntity, WhatsappAccountPhoneNumberRequest>(
                `${this.url}/${accountId}/phone-numbers`,
                request
            ).subscribe(
                (response: WhatsappAccountPhoneNumberEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(accountId: string, request: WhatsappAccountPhoneNumberRequest): Promise<WhatsappAccountPhoneNumberEntity> {
        const promise: Promise<WhatsappAccountPhoneNumberEntity> = new Promise((resolve: any, reject: any) => {
            this.put<WhatsappAccountPhoneNumberEntity, WhatsappAccountPhoneNumberRequest>(
                `${this.url}/${accountId}/phone-numbers`,
                request
            ).subscribe(
                (response: WhatsappAccountPhoneNumberEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async destroy(accountId: string, id: string): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.delete<BooleanResponse>(`${this.url}/${accountId}/phone-numbers/${id}`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
