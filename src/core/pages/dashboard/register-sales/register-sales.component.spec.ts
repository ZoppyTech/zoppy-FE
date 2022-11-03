/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterSalesComponent } from './register-sales.component';

describe('RegisterSalesComponent', () => {
    let component: RegisterSalesComponent;
    let fixture: ComponentFixture<RegisterSalesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterSalesComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterSalesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
