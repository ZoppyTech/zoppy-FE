/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NuvemshopAccessKeysComponent } from './nuvemshop-access-keys.component';

describe('NuvemshopAccessKeysComponent', () => {
    let component: NuvemshopAccessKeysComponent;
    let fixture: ComponentFixture<NuvemshopAccessKeysComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NuvemshopAccessKeysComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NuvemshopAccessKeysComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
