import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WcGiftbackConfigEntity } from 'src/shared/models/entities/wc-giftback-config.entity';
import { GiftbackRequest } from 'src/shared/models/requests/giftback/giftback.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class WcGiftbackService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/woo-commerce/config/giftback`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async create(request: GiftbackRequest): Promise<WcGiftbackConfigEntity> {
        const promise: Promise<WcGiftbackConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WcGiftbackConfigEntity, GiftbackRequest>(`${this.url}`, request).subscribe(
                (response: WcGiftbackConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(request: GiftbackRequest): Promise<WcGiftbackConfigEntity> {
        const promise: Promise<WcGiftbackConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.put<WcGiftbackConfigEntity, GiftbackRequest>(`${this.url}`, request).subscribe(
                (response: WcGiftbackConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async find(): Promise<WcGiftbackConfigEntity> {
        const promise: Promise<WcGiftbackConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.get<WcGiftbackConfigEntity>(`${this.url}`).subscribe(
                (response: WcGiftbackConfigEntity) => resolve(response),
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
