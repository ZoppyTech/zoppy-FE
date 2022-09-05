import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService, ZoppyException } from '../api.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { CompanyRequest } from 'src/shared/models/requests/company/company.request';

@Injectable({
    providedIn: 'root'
})
export class CompanyService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/companies`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async update(request: CompanyRequest): Promise<CompanyEntity> {
        const promise: Promise<CompanyEntity> = new Promise((resolve: any, reject: any) => {
            this.put<CompanyEntity, CompanyRequest>(`${this.url}`, request).subscribe(
                (response: CompanyEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
