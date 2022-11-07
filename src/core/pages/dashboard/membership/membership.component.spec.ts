/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MembershipComponent } from './membership.component';

describe('MembershipComponent', () => {
    let component: MembershipComponent;
    let fixture: ComponentFixture<MembershipComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MembershipComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MembershipComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
