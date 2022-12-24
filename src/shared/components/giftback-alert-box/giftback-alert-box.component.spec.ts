/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiftbackAlertBoxComponent } from './giftback-alert-box.component';

describe('GiftbackAlertBoxComponent', () => {
    let component: GiftbackAlertBoxComponent;
    let fixture: ComponentFixture<GiftbackAlertBoxComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiftbackAlertBoxComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GiftbackAlertBoxComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
