import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationComponent } from './integration.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('IntegrationComponent', () => {
    let component: IntegrationComponent;
    let fixture: ComponentFixture<IntegrationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [IntegrationComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        }).compileComponents();

        fixture = TestBed.createComponent(IntegrationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
