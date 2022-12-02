/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MessageConfigService } from './message-config.service';

describe('Service: MessageConfig', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [MessageConfigService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([MessageConfigService], (service: MessageConfigService) => {
        expect(service).toBeTruthy();
    }));
});
