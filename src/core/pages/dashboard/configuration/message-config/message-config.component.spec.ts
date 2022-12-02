/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MessageConfigComponent } from './message-config.component';

describe('MessageConfigComponent', () => {
    let component: MessageConfigComponent;
    let fixture: ComponentFixture<MessageConfigComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MessageConfigComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MessageConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
