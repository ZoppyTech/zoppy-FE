/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MyCompanyUsersComponent } from './my-company-users.component';

describe('MyCompanyUsersComponent', () => {
    let component: MyCompanyUsersComponent;
    let fixture: ComponentFixture<MyCompanyUsersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MyCompanyUsersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MyCompanyUsersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
