/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { RegisterSalesComponent } from './register-sales.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegisterSalesComponent', () => {
    let component: RegisterSalesComponent;
    let fixture: ComponentFixture<RegisterSalesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RegisterSalesComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(RegisterSalesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
