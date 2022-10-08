/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalesByStateComponent } from './sales-by-state.component';

describe('SalesByStateComponent', () => {
    let component: SalesByStateComponent;
    let fixture: ComponentFixture<SalesByStateComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SalesByStateComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesByStateComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
