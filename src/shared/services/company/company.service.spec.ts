/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CompanyService } from './company.service';

describe('Service: Company', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: [CompanyService]
        });
    });

    it('should ...', inject([CompanyService], (service: CompanyService) => {
        expect(service).toBeTruthy();
    }));
});
