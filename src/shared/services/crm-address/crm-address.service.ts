import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { ZoppyFilter } from 'src/shared/models/filter';
import { CrmAddressResponse } from 'src/shared/models/responses/crm/crm-address.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class CrmAddressService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/crm-addresses`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async findByPhone(phone: string): Promise<CrmAddressResponse> {
        const promise: Promise<CrmAddressResponse> = new Promise((resolve: any, reject: any) => {
            this.get<CrmAddressResponse>(`${this.url}/${phone}`).subscribe(
                (response: CrmAddressResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
