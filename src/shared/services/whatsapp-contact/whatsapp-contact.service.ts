import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { WhatsappContactRequest } from 'src/shared/models/requests/whatsapp-contact/whatsapp-contact.request';

@Injectable({
    providedIn: 'root'
})
export class WhatsappContactService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-contacts`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(): Promise<Array<WhatsappContactEntity>> {
        const promise: Promise<Array<WhatsappContactEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappContactEntity>>(`${this.url}`).subscribe(
                (response: Array<WhatsappContactEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findById(id: string): Promise<WhatsappContactEntity> {
        const promise: Promise<WhatsappContactEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappContactEntity>(`${this.url}/${id}`).subscribe(
                (response: WhatsappContactEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: WhatsappContactRequest): Promise<WhatsappContactEntity> {
        const promise: Promise<WhatsappContactEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappContactEntity, WhatsappContactRequest>(`${this.url}`, request).subscribe(
                (response: WhatsappContactEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async createMany(requests: Array<WhatsappContactRequest>): Promise<Array<WhatsappContactEntity>> {
        const promise: Promise<Array<WhatsappContactEntity>> = new Promise((resolve: any, reject: any) => {
            this.post<Array<WhatsappContactEntity>, Array<WhatsappContactRequest>>(`${this.url}/many`, requests).subscribe(
                (response: Array<WhatsappContactEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async sync(): Promise<Array<WhatsappContactEntity>> {
        const promise: Promise<Array<WhatsappContactEntity>> = new Promise((resolve: any, reject: any) => {
            this.post<Array<WhatsappContactEntity>, null>(`${this.url}/sync`, null).subscribe(
                (response: Array<WhatsappContactEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(request: WhatsappContactRequest): Promise<WhatsappContactEntity> {
        const promise: Promise<WhatsappContactEntity> = new Promise((resolve: any, reject: any) => {
            this.put<WhatsappContactEntity, WhatsappContactRequest>(`${this.url}`, request).subscribe(
                (response: WhatsappContactEntity) => resolve(response),
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
