import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyComponent } from './key.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('KeyComponent', () => {
    let component: KeyComponent;
    let fixture: ComponentFixture<KeyComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [KeyComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        }).compileComponents();

        fixture = TestBed.createComponent(KeyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
