/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SocialMediaService } from './social-media.service';

describe('Service: SocialMedia', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SocialMediaService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([SocialMediaService], (service: SocialMediaService) => {
        expect(service).toBeTruthy();
    }));
});
