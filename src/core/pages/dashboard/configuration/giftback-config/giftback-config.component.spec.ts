/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiftbackConfigComponent } from './giftback-config.component';

describe('GiftbackConfigComponent', () => {
    let component: GiftbackConfigComponent;
    let fixture: ComponentFixture<GiftbackConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiftbackConfigComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GiftbackConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
