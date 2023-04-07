import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomationComponent } from './automation.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('AutomationComponent', () => {
    let component: AutomationComponent;
    let fixture: ComponentFixture<AutomationComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AutomationComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AutomationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
