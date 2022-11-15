/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BatchUploadOrdersComponent } from './batch-upload-orders.component';

describe('BatchUploadOrdersComponent', () => {
    let component: BatchUploadOrdersComponent;
    let fixture: ComponentFixture<BatchUploadOrdersComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BatchUploadOrdersComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BatchUploadOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
