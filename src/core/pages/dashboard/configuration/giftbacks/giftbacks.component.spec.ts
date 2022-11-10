/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GiftbacksComponent } from './giftbacks.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';

describe('GiftbacksComponent', () => {
    let component: GiftbacksComponent;
    let fixture: ComponentFixture<GiftbacksComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GiftbacksComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
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
