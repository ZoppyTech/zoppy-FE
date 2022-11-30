/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomerSocialMediaComponent } from './customer-social-media.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CustomerSocialMediaComponent', () => {
    let component: CustomerSocialMediaComponent;
    let fixture: ComponentFixture<CustomerSocialMediaComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomerSocialMediaComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomerSocialMediaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
