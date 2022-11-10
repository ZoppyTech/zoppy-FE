/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiftbacksComponent } from './giftbacks.component';

describe('GiftbacksComponent', () => {
    let component: GiftbacksComponent;
    let fixture: ComponentFixture<GiftbacksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiftbacksComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GiftbacksComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
