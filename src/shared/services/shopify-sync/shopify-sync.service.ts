import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { SyncRequest } from 'src/shared/models/requests/wc-sync/wc-sync.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class ShopifySyncService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/shopify/sync`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async syncWebhooks(): Promise<BooleanResponse> {
        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.post<BooleanResponse, SyncRequest>(`${this.url}/webhooks`).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
