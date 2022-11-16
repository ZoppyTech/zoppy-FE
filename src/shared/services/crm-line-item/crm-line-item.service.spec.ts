/* tslint:disable:no-unused-variable */

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, inject } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CrmLineItemService } from './crm-line-item.service';

describe('Service: CrmLineItem', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [CrmLineItemService],
            imports: [HttpClientTestingModule, RouterTestingModule]
        });
    });

    it('should ...', inject([CrmLineItemService], (service: CrmLineItemService) => {
        expect(service).toBeTruthy();
    }));
});
