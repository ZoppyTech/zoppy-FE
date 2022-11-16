import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { UserRequest } from 'src/shared/models/requests/user/user.request';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/users`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async list(): Promise<Array<UserEntity>> {
        const promise: Promise<Array<UserEntity>> = new Promise((resolve: any, reject: any) => {
            this.get<Array<UserEntity>>(`${this.url}`).subscribe(
                (response: Array<UserEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async find(id: string): Promise<UserEntity> {
        const promise: Promise<UserEntity> = new Promise((resolve: any, reject: any) => {
            this.get<UserEntity>(`${this.url}/${id}`).subscribe(
                (response: UserEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async myself(): Promise<UserEntity> {
        const promise: Promise<UserEntity> = new Promise((resolve: any, reject: any) => {
            this.get<UserEntity>(`${this.url}/myself`).subscribe(
                (response: UserEntity) => resolve(response),
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

    public async create(request: UserRequest): Promise<UserEntity> {
        const promise: Promise<UserEntity> = new Promise((resolve: any, reject: any) => {
            this.post<UserEntity, UserRequest>(`${this.url}`, request).subscribe(
                (response: UserEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async update(id: string, request: UserRequest): Promise<UserEntity> {
        const promise: Promise<UserEntity> = new Promise((resolve: any, reject: any) => {
            this.put<UserEntity, UserRequest>(`${this.url}/${id}`, request).subscribe(
                (response: UserEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
