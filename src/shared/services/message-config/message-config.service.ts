import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageConfigEntity } from 'src/shared/models/entities/message-config.entity';
import { MessageConfigRequest } from 'src/shared/models/requests/message-config/message-config.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class MessageConfigService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/message-configs`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async find(): Promise<MessageConfigEntity> {
        const promise: Promise<MessageConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.get<MessageConfigEntity>(`${this.url}`).subscribe(
                (response: MessageConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: MessageConfigRequest): Promise<MessageConfigEntity> {
        const promise: Promise<MessageConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.post<MessageConfigEntity, MessageConfigRequest>(`${this.url}`, request).subscribe(
                (response: MessageConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(id: string, request: MessageConfigRequest): Promise<MessageConfigEntity> {
        const promise: Promise<MessageConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.put<MessageConfigEntity, MessageConfigRequest>(`${this.url}/${id}`, request).subscribe(
                (response: MessageConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
