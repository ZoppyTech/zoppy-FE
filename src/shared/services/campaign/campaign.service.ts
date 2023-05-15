import { Injectable } from '@angular/core';
import { ApiService, ZoppyException } from '../api.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from 'src/shared/utils/storage';
import { ZoppyFilter } from 'src/shared/models/filter';
import { CampaignEntity } from 'src/shared/models/entities/campaign.entity';
import { CampaignRequest } from 'src/shared/models/requests/campaign/campaign.request';
import { DateUtil } from '@ZoppyTech/utilities';

@Injectable({
    providedIn: 'root'
})
export class CampaignService extends ApiService {
    public override url: string = `${environment.apiUrl}/api/campaigns`;

    public constructor(
        public override readonly http: HttpClient,
        public override readonly router: Router,
        public override readonly storage: Storage
    ) {
        super(http, router, storage);
    }

    public async findAllPaginated(filter: ZoppyFilter<CampaignEntity>): Promise<ZoppyFilter<CampaignEntity>> {
        const promise: Promise<ZoppyFilter<CampaignEntity>> = new Promise((resolve: any, reject: any) => {
            this.post<ZoppyFilter<CampaignEntity>, ZoppyFilter<CampaignEntity>>(`${this.url}/list`, filter).subscribe(
                (response: ZoppyFilter<CampaignEntity>) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async downloadSample(name: string, id: string): Promise<any> {
        const promise: Promise<any> = new Promise((resolve: any, reject: any) => {
            this.download<any>(`${this.url}/download/${id}/${name}`).subscribe(
                (response: any) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }

    public async create(request: CampaignRequest): Promise<CampaignEntity> {
        const params: FormData = new FormData();
        params.append('name', request.name);
        params.append('messageTemplateGroupId', request.messageTemplateGroupId);
        params.append('activationDate', new Date(request.activationDate).toISOString() as any);
        params.append('file', request.file);

        const promise: Promise<CampaignEntity> = new Promise((resolve: any, reject: any) => {
            this.post<CampaignEntity, FormData>(`${this.url}`, params).subscribe(
                (response: CampaignEntity) => resolve(response),
                (error: ZoppyException) => reject(error)
            );
        });
        return promise;
    }
}
