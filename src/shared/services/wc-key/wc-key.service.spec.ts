/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { WcKeyService } from './wc-key.service';

describe('Service: WcKey', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [WcKeyService]
        });
    });

    it('should ...', inject([WcKeyService], (service: WcKeyService) => {
        expect(service).toBeTruthy();
    }));
});
