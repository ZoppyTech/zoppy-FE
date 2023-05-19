import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { SocialMediaRequest } from 'src/shared/models/requests/social-media/social-media.request';
import { SocialMediaCustomerDetailResponse } from 'src/shared/models/responses/social-media/social-media-customer-detail.response';
import { SocialMediaCustomerTaskResponse } from 'src/shared/models/responses/social-media/social-media-customer-task.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';
import { ZoppyFilter } from 'src/shared/models/filter';

@Injectable({
    providedIn: 'root'
})
export class SocialMediaService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/social-media`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async create(customerId: string, request: SocialMediaRequest): Promise<TaskEntity> {
        const promise: Promise<TaskEntity> = new Promise((resolve: any, reject: any) => {
            this.post<TaskEntity, SocialMediaRequest>(`${this.url}/customers/${customerId}/tasks`, request).subscribe(
                (response: TaskEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(customerId: string, taskId: string, request: SocialMediaRequest): Promise<TaskEntity> {
        const promise: Promise<TaskEntity> = new Promise((resolve: any, reject: any) => {
            this.put<TaskEntity, SocialMediaRequest>(`${this.url}/customers/${customerId}/tasks/${taskId}`, request).subscribe(
                (response: TaskEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async list(customerId: string): Promise<SocialMediaCustomerTaskResponse[]> {
        const promise: Promise<SocialMediaCustomerTaskResponse[]> = new Promise((resolve: any, reject: any) => {
            this.get<SocialMediaCustomerTaskResponse[]>(`${this.url}/customers/${customerId}/tasks`).subscribe(
                (response: SocialMediaCustomerTaskResponse[]) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async listSalesPanel(request: SalesPanelRequest): Promise<ZoppyFilter<TaskEntity>> {
        const promise: Promise<ZoppyFilter<TaskEntity>> = new Promise((resolve: any, reject: any) => {
            this.post<ZoppyFilter<TaskEntity>, SalesPanelRequest>(`${this.url}/sales-panel`, request).subscribe(
                (response: ZoppyFilter<TaskEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async details(customerId: string): Promise<SocialMediaCustomerDetailResponse> {
        const promise: Promise<SocialMediaCustomerDetailResponse> = new Promise((resolve: any, reject: any) => {
            this.get<SocialMediaCustomerDetailResponse>(`${this.url}/customers/${customerId}`).subscribe(
                (response: SocialMediaCustomerDetailResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
