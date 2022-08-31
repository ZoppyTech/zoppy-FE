/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ExternalTokenService } from './external-token.service';

describe('Service: ExternalToken', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ExternalTokenService]
        });
    });

    it('should ...', inject([ExternalTokenService], (service: ExternalTokenService) => {
        expect(service).toBeTruthy();
    }));
});
