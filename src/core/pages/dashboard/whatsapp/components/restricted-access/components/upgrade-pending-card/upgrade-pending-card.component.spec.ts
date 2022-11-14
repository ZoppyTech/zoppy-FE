import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePendingCardComponent } from './upgrade-pending-card.component';

describe('UpgradePendingCardComponent', () => {
    let component: UpgradePendingCardComponent;
    let fixture: ComponentFixture<UpgradePendingCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UpgradePendingCardComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(UpgradePendingCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
