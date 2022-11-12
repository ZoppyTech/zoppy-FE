import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LetalkConfigEntity } from 'src/shared/models/entities/letalk-config.entity';
import { LetalkConfigRequest } from 'src/shared/models/requests/letalk/letalk.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class LetalkConfigService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/letalk-configs`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async find(): Promise<LetalkConfigEntity> {
        const promise: Promise<LetalkConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.get<LetalkConfigEntity>(`${this.url}`).subscribe(
                (response: LetalkConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: LetalkConfigRequest): Promise<LetalkConfigEntity> {
        const promise: Promise<LetalkConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.post<LetalkConfigEntity, LetalkConfigRequest>(`${this.url}`, request).subscribe(
                (response: LetalkConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(id: string, request: LetalkConfigRequest): Promise<LetalkConfigEntity> {
        const promise: Promise<LetalkConfigEntity> = new Promise((resolve: any, reject: any) => {
            this.put<LetalkConfigEntity, LetalkConfigRequest>(`${this.url}/${id}`, request).subscribe(
                (response: LetalkConfigEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
