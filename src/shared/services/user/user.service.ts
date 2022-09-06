import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

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
}
