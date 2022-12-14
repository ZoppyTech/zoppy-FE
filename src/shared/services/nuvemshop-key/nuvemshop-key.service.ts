import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { WcKeyEntity } from 'src/shared/models/entities/wc-key.entity';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class NuvemshopKeyService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/nuvemshop/keys`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async create(wcKeyRequest: wcKeyRequest): Promise<WcKeyEntity> {
        const promise: Promise<WcKeyEntity> = new Promise((resolve: any, reject: any) => {
            this.post<WcKeyEntity, wcKeyRequest>(`${this.url}`, wcKeyRequest).subscribe(
                (response: WcKeyEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
