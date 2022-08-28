/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccessKeysComponent } from './access-keys.component';

describe('AccessKeysComponent', () => {
    let component: AccessKeysComponent;
    let fixture: ComponentFixture<AccessKeysComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccessKeysComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessKeysComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
