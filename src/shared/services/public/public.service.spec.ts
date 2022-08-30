import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PublicService } from './public.service';

describe('PublicService', () => {
    let service: PublicService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule, RouterTestingModule],
            providers: []
        });
        service = TestBed.inject(PublicService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
