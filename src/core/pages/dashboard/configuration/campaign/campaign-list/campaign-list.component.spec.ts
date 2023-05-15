import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignListComponent } from './campaign-list.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CampaignListComponent', () => {
    let component: CampaignListComponent;
    let fixture: ComponentFixture<CampaignListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CampaignListComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, IconModule, ButtonModule, InputModule]
        }).compileComponents();

        fixture = TestBed.createComponent(CampaignListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
