import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class DownloadService extends ApiService {
    public override url: string = `${environment.apiUrl}/api`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage,
        public confirmActionService: ConfirmActionService
    ) {
        super(http, router, storage);
    }

    public async downloadPublicFile(path: string, fileName: string, type: string): Promise<any> {
        const params: HttpParams = new HttpParams().append('path', path).append('fileName', fileName).append('type', type);
        const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
            this.download<any>(`${this.url}/download`, params).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
