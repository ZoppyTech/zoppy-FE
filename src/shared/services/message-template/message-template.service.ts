import { MessageTemplateGroupRequest } from './../../models/requests/message-template/message-template-group.request';
import { MessageTemplateGroupEntity } from './../../models/entities/message-template-group.entity';
import { BooleanResponse } from './../api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MessageTemplateEntity } from 'src/shared/models/entities/message-template.entity';
import { MessageTemplateRequest } from 'src/shared/models/requests/message-template/message-template.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class MessageTemplateService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/message`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(groupId: string): Promise<MessageTemplateEntity[]> {
        const promise: Promise<MessageTemplateEntity[]> = new Promise((resolve: any, reject: any) => {
            this.get<MessageTemplateEntity[]>(`${this.url}/groups/${groupId}/templates`).subscribe(
                (response: MessageTemplateEntity[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(groupId: string, request: MessageTemplateRequest): Promise<MessageTemplateEntity> {
        const promise: Promise<MessageTemplateEntity> = new Promise((resolve: any, reject: any) => {
            this.post<MessageTemplateEntity, MessageTemplateRequest>(`${this.url}/groups/${groupId}/templates`, request).subscribe(
                (response: MessageTemplateEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(id: string, groupId: string, request: MessageTemplateRequest): Promise<MessageTemplateEntity> {
        const promise: Promise<MessageTemplateEntity> = new Promise((resolve: any, reject: any) => {
            this.put<MessageTemplateEntity, MessageTemplateRequest>(`${this.url}/groups/${groupId}/templates/${id}`, request).subscribe(
                (response: MessageTemplateEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async destroy(id: string, groupId: string): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.delete<BooleanResponse>(`${this.url}/groups/${groupId}/templates/${id}`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findGroup(groupId: string): Promise<MessageTemplateGroupEntity> {
        const promise: Promise<MessageTemplateGroupEntity> = new Promise((resolve: any, reject: any) => {
            this.get<MessageTemplateGroupEntity>(`${this.url}/groups/${groupId}`).subscribe(
                (response: MessageTemplateGroupEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async listGroups(): Promise<MessageTemplateGroupEntity[]> {
        const promise: Promise<MessageTemplateGroupEntity[]> = new Promise((resolve: any, reject: any) => {
            this.get<MessageTemplateGroupEntity[]>(`${this.url}/groups`).subscribe(
                (response: MessageTemplateGroupEntity[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async createGroup(request: MessageTemplateGroupRequest): Promise<MessageTemplateGroupEntity> {
        const promise: Promise<MessageTemplateGroupEntity> = new Promise((resolve: any, reject: any) => {
            this.post<MessageTemplateGroupEntity, MessageTemplateGroupRequest>(`${this.url}/groups`, request).subscribe(
                (response: MessageTemplateGroupEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async updateGroup(id: string, request: MessageTemplateGroupRequest): Promise<MessageTemplateGroupEntity> {
        const promise: Promise<MessageTemplateGroupEntity> = new Promise((resolve: any, reject: any) => {
            this.put<MessageTemplateGroupEntity, MessageTemplateGroupRequest>(`${this.url}/groups/${id}`, request).subscribe(
                (response: MessageTemplateGroupEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async destroyGroup(id: string): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.delete<BooleanResponse>(`${this.url}/groups/${id}`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
