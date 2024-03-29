/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NewTaskComponent } from './new-task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('NewTaskComponent', () => {
    let component: NewTaskComponent;
    let fixture: ComponentFixture<NewTaskComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [NewTaskComponent],
            imports: [HttpClientTestingModule, RouterTestingModule]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NewTaskComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
