import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
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

    public async list(): Promise<Array<WhatsappConversationEntity>> {
        const promise: Promise<Array<WhatsappConversationEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappConversationEntity>>(`${this.url}`).subscribe(
                (response: Array<WhatsappConversationEntity>) => resolve(response),
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
}
