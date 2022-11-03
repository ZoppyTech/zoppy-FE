/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CustomersComponent } from './customers.component';

describe('CustomersComponent', () => {
    let component: CustomersComponent;
    let fixture: ComponentFixture<CustomersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CustomersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CustomersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
