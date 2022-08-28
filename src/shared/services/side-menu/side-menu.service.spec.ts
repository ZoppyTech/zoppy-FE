/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SideMenuService } from './side-menu.service';

describe('Service: SideMenu', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [SideMenuService]
        });
    });

    it('should ...', inject([SideMenuService], (service: SideMenuService) => {
        expect(service).toBeTruthy();
    }));
});
