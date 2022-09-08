/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCompanyUserConfigComponent } from './my-company-user-config.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('MyCompanyUserConfigComponent', () => {
    let component: MyCompanyUserConfigComponent;
    let fixture: ComponentFixture<MyCompanyUserConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyCompanyUserConfigComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
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
