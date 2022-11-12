import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { DashboardResponse } from 'src/shared/models/responses/dashboard/dashboard.response';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class DashboardService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/dashboard`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async fetchOne(): Promise<DashboardResponse> {
        const promise: Promise<DashboardResponse> = new Promise((resolve: any, reject: any) => {
            this.get<DashboardResponse>(`${this.url}`).subscribe(
                (response: DashboardResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
