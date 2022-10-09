/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DailySalesComponent } from './daily-sales.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('DailySalesComponent', () => {
    let component: DailySalesComponent;
    let fixture: ComponentFixture<DailySalesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DailySalesComponent],
            imports: [RouterTestingModule, HttpClientTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DailySalesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
