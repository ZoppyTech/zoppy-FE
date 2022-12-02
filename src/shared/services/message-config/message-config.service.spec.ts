/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageConfigService } from './message-config.service';

describe('Service: MessageConfig', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MessageConfigService]
        });
    });

    it('should ...', inject([MessageConfigService], (service: MessageConfigService) => {
        expect(service).toBeTruthy();
    }));
});
