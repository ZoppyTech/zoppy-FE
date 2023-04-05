import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappConversationRequest } from 'src/shared/models/requests/whatsapp-conversation/whatsapp-conversation.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class WhatsappConversationService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-conversations`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(): Promise<WhatsappConversationEntity> {
        const promise: Promise<WhatsappConversationEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappConversationEntity>(`${this.url}`).subscribe(
                (response: WhatsappConversationEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findByContactId(contactId: string): Promise<WhatsappConversationEntity> {
        const promise: Promise<WhatsappConversationEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappConversationEntity>(`${this.url}/latest/from-contact/${contactId}`).subscribe(
                (response: WhatsappConversationEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findInProgressByManagerId(managerId: string): Promise<WhatsappConversationEntity[]> {
        const promise: Promise<WhatsappConversationEntity[]> = new Promise((resolve: any, reject: any) => {
            this.get<WhatsappConversationEntity[]>(`${this.url}/in-progress/from-manager/${managerId}`).subscribe(
                (response: WhatsappConversationEntity[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async transfer(id: string, request: WhatsappConversationRequest): Promise<WhatsappConversationEntity> {
        const promise: Promise<WhatsappConversationEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappConversationEntity, WhatsappConversationRequest>(`${this.url}/${id}/transfer`, request).subscribe(
                (response: WhatsappConversationEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async finish(id: string, request: WhatsappConversationRequest): Promise<WhatsappConversationEntity> {
        const promise: Promise<WhatsappConversationEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WhatsappConversationEntity, WhatsappConversationRequest>(`${this.url}/${id}/finish`, request).subscribe(
                (response: WhatsappConversationEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async pull(): Promise<WhatsappConversationEntity> {
        const promise: Promise<WhatsappConversationEntity> = new Promise((resolve: any, reject: any) => {
            this.put<WhatsappConversationEntity, WhatsappConversationRequest>(`${this.url}/pull`).subscribe(
                (response: WhatsappConversationEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
