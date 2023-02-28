import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PaymentMethodEntity } from 'src/shared/models/entities/payment-method.entity';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class PaymentMethodService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/payment-methods`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async find(): Promise<PaymentMethodEntity> {
        const promise: Promise<PaymentMethodEntity> = new Promise((resolve: any, reject: any) => {
            this.get<PaymentMethodEntity>(`${this.url}`).subscribe(
                (response: PaymentMethodEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
