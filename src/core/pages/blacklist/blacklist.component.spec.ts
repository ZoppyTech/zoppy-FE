/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlacklistComponent } from './blacklist.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BlacklistComponent', () => {
    let component: BlacklistComponent;
    let fixture: ComponentFixture<BlacklistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BlacklistComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BlacklistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
