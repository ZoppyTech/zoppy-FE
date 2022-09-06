/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCompanyConfigComponent } from './my-company-config.component';

describe('MyCompanyConfigComponent', () => {
    let component: MyCompanyConfigComponent;
    let fixture: ComponentFixture<MyCompanyConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyCompanyConfigComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyCompanyConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
