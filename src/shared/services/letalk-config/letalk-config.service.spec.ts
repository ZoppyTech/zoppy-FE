/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { LetalkConfigService } from './letalk-config.service';

describe('Service: LetalkConfig', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LetalkConfigService]
        });
    });

    it('should ...', inject([LetalkConfigService], (service: LetalkConfigService) => {
        expect(service).toBeTruthy();
    }));
});
