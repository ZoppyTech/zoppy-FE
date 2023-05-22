import { Injectable } from '@angular/core';
import { ApiService, ZoppyException } from '../api.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { ZoppyFilter } from 'src/shared/models/filter';

@Injectable({
    providedIn: 'root'
})
export class ViewCustomerService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/view-customers`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async findAllPaginated(filter: ZoppyFilter<ViewCustomerEntity>): Promise<ZoppyFilter<ViewCustomerEntity>> {
        const promise: Promise<ZoppyFilter<ViewCustomerEntity>> = new Promise((resolve: any, reject: any) => {
            this.post<ZoppyFilter<ViewCustomerEntity>, ZoppyFilter<ViewCustomerEntity>>(`${this.url}/list`, filter).subscribe(
                (response: ZoppyFilter<ViewCustomerEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findById(id: string): Promise<ViewCustomerEntity> {
        const promise: Promise<ViewCustomerEntity> = new Promise((resolve: any, reject: any) => {
            this.get<ViewCustomerEntity>(`${this.url}/${id}`).subscribe(
                (response: ViewCustomerEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async findByPhone(phone: string): Promise<ViewCustomerEntity> {
        const promise: Promise<ViewCustomerEntity> = new Promise((resolve: any, reject: any) => {
            this.get<ViewCustomerEntity>(`${this.url}/phones/${phone}`).subscribe(
                (response: ViewCustomerEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
