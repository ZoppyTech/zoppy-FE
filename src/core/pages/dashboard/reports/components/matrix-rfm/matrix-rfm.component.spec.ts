/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MatrixRfmComponent } from './matrix-rfm.component';

describe('MatrixRfmComponent', () => {
    let component: MatrixRfmComponent;
    let fixture: ComponentFixture<MatrixRfmComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MatrixRfmComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatrixRfmComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
