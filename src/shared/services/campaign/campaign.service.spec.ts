/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CampaignService } from './campaign.service';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Service: Campaign', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CampaignService],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        });
    });

    it('should ...', inject([CampaignService], (service: CampaignService) => {
        expect(service).toBeTruthy();
    }));
});
