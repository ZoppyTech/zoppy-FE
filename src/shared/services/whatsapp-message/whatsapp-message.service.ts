import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { WhatsappTextMessageRequest } from 'src/shared/models/requests/whatsapp-message/whatsapp-text-message.request';
import { WhatsappTemplateMessageRequest } from 'src/shared/models/requests/whatsapp-message/whatsapp-template-message.request';

@Injectable({
    providedIn: 'root'
})
export class WhatsappMessageService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-messages`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async listByPhoneNumberId(phoneNumberId: string): Promise<Array<WhatsappMessageEntity>> {
        const promise: Promise<Array<WhatsappMessageEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappMessageEntity>>(`${this.url}/from-phone/${phoneNumberId}`).subscribe(
                (response: Array<WhatsappMessageEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async listByContactId(contactId: string): Promise<Array<WhatsappMessageEntity>> {
        const promise: Promise<Array<WhatsappMessageEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappMessageEntity>>(`${this.url}/from-contact/${contactId}`).subscribe(
                (response: Array<WhatsappMessageEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async listByManagerId(managerId: string): Promise<Array<WhatsappMessageEntity>> {
        const promise: Promise<Array<WhatsappMessageEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappMessageEntity>>(`${this.url}/from-manager/${managerId}`).subscribe(
                (response: Array<WhatsappMessageEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async listFinishedByManagerId(managerId: string): Promise<Array<WhatsappMessageEntity>> {
        const promise: Promise<Array<WhatsappMessageEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappMessageEntity>>(`${this.url}/finished/from-manager/${managerId}`).subscribe(
                (response: Array<WhatsappMessageEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async createTextMessage(request: WhatsappTextMessageRequest): Promise<WhatsappMessageEntity> {
        const promise: Promise<WhatsappMessageEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappMessageEntity, WhatsappTextMessageRequest>(`${this.url}/text`, request).subscribe(
                (response: WhatsappMessageEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async createTemplateMessage(request: WhatsappTemplateMessageRequest): Promise<WhatsappMessageEntity> {
        const promise: Promise<WhatsappMessageEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappMessageEntity, WhatsappTemplateMessageRequest>(`${this.url}/template`, request).subscribe(
                (response: WhatsappMessageEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    //TODO: Create function to reply message in backend
    // public async reply(request: WhatsappTextMessageRequest): Promise<WhatsappMessageEntity> {
    //     const promise: Promise<WhatsappMessageEntity> = new Promise((resolve: any, reject: any) => {
    //         this.put<WhatsappMessageEntity, WhatsappTextMessageRequest>(`${this.url}/reply`, request).subscribe(
    //             (response: WhatsappMessageEntity) => resolve(response),
    //             (error: ZoppyException) => reject(error)
    //         );
    //     });
    //     return promise;
    // }

    //TODO: Create function to delete message in backend
    // public async destroy(id: string): Promise<BooleanResponse> {
    //     const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
    //         this.delete<BooleanResponse>(`${this.url}/${id}`).subscribe(
    //             (response: BooleanResponse) => resolve(response),
    //             (error: ZoppyException) => reject(error)
    //         );
    //     });
    //     return promise;
    // }
}
