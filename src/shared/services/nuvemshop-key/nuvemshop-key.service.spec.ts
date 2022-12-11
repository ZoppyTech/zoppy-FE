/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NuvemshopKeyService } from './nuvemshop-key.service';

describe('Service: NuvemshopKey', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [NuvemshopKeyService]
        });
    });

    it('should ...', inject([NuvemshopKeyService], (service: NuvemshopKeyService) => {
        expect(service).toBeTruthy();
    }));
});
