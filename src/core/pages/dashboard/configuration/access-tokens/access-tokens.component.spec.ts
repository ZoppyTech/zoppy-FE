/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AccessTokensComponent } from './access-tokens.component';

describe('AccessTokensComponent', () => {
    let component: AccessTokensComponent;
    let fixture: ComponentFixture<AccessTokensComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AccessTokensComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AccessTokensComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
