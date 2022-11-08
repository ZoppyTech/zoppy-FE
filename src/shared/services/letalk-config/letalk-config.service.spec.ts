/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LetalkConfigService } from './letalk-config.service';

describe('Service: LetalkConfig', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LetalkConfigService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([LetalkConfigService], (service: LetalkConfigService) => {
        expect(service).toBeTruthy();
    }));
});
