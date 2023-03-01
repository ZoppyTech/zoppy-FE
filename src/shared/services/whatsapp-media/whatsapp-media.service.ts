import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { WhatsappConstants } from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';
import { Storage } from 'src/shared/utils/storage';
import { ApiService, BooleanResponse, ZoppyException } from '../api.service';

@Injectable({
    providedIn: 'root'
})
export class WhatsappMediaService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/whatsapp-medias`;
    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async downloadMedia(id: string): Promise<any> {
        const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
            this.download<any>(`${this.url}/${id}/download`).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async uploadMediaImage(fileName: string, fileData: any): Promise<BooleanResponse> {
        debugger;
        const params: any = new FormData();
        params.append('file', fileData);

        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.post<BooleanResponse, HttpParams>(`${this.url}/upload-image`, params).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
        // const params: any = new FormData();
        // params.append('fileName', fileName);
        // params.append('fileData', fileData);
        // const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
        //     this.post<BooleanResponse, HttpParams>(`${this.url}/upload-image`, params).subscribe(
        //         (response: BooleanResponse) => resolve(response),
        //         (error: ZoppyException) => reject(error)
        //     );
        // });
        // return promise;
    }

    public async uploadMediaDocument(fileName: string, fileData: string): Promise<BooleanResponse> {
        const params: any = new FormData();
        params.append('fileName', fileName);
        params.append('fileData', fileData);

        const promise: Promise<BooleanResponse> = new Promise((resolve: any, reject: any) => {
            this.post<BooleanResponse, HttpParams>(`${this.url}/upload-document`, params).subscribe(
                (response: BooleanResponse) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
