/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCompanyUserConfigComponent } from './my-company-user-config.component';

describe('MyCompanyUserConfigComponent', () => {
    let component: MyCompanyUserConfigComponent;
    let fixture: ComponentFixture<MyCompanyUserConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyCompanyUserConfigComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyCompanyUserConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
