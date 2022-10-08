/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MonthlyInvoicesComponent } from './monthly-invoices.component';

describe('MonthlyInvoicesComponent', () => {
    let component: MonthlyInvoicesComponent;
    let fixture: ComponentFixture<MonthlyInvoicesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MonthlyInvoicesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MonthlyInvoicesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
