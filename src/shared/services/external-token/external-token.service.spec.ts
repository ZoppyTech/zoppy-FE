/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExternalTokenService } from './external-token.service';

describe('Service: ExternalToken', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [ExternalTokenService]
        });
    });

    it('should ...', inject([ExternalTokenService], (service: ExternalTokenService) => {
        expect(service).toBeTruthy();
    }));
});
