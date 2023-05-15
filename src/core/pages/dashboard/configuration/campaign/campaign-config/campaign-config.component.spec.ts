import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignConfigComponent } from './campaign-config.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CampaignConfigComponent', () => {
    let component: CampaignConfigComponent;
    let fixture: ComponentFixture<CampaignConfigComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CampaignConfigComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CampaignConfigComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
