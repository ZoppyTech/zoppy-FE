import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseComponent } from './base.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('BaseComponent', () => {
    let component: BaseComponent;
    let fixture: ComponentFixture<BaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [BaseComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        }).compileComponents();

        fixture = TestBed.createComponent(BaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
