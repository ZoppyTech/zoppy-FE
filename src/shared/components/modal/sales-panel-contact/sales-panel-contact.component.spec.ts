/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SalesPanelContactComponent } from './sales-panel-contact.component';

describe('SalesPanelContactComponent', () => {
    let component: SalesPanelContactComponent;
    let fixture: ComponentFixture<SalesPanelContactComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SalesPanelContactComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SalesPanelContactComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
});
