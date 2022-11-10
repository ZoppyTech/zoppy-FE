import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';
import { ApiService } from '../api.service';

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

    public downloadPublicFile(path: string, fileName: string, type: string): any {
        const params: HttpParams = new HttpParams().append('path', path).append('fileName', fileName).append('type', type);
        const headers: HttpHeaders = this.setHeaders(new HttpHeaders());
        return this.http.get(`${this.url}/download`, {
            params,
            responseType: 'text',
            headers: headers
        });
    }
}
