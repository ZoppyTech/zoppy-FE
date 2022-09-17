import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { WhatsappMessageTemplateEntity } from 'src/shared/models/entities/whatsapp-message-template.entity';
import { WhatsappManagedMessageTemplateRequest } from 'src/shared/models/requests/whatsapp-business-management/whatsapp-managed-message-template.request';

@Injectable({
    providedIn: 'root'
})
export class WhatsappBusinessManagementService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-business-management/message-templates`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(): Promise<Array<WhatsappMessageTemplateEntity>> {
        const promise: Promise<Array<WhatsappMessageTemplateEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<WhatsappMessageTemplateEntity>>(`${this.url}`).subscribe(
                (response: Array<WhatsappMessageTemplateEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async pull(request: WhatsappManagedMessageTemplateRequest): Promise<Array<WhatsappMessageTemplateEntity>> {
        const promise: Promise<Array<WhatsappMessageTemplateEntity>> = new Promise((resolve: any, reject: any) => {
            this.put<Array<WhatsappMessageTemplateEntity>, WhatsappManagedMessageTemplateRequest>(`${this.url}/pull`, request).subscribe(
                (response: Array<WhatsappMessageTemplateEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
