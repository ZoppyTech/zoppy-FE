import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportRatingComponent } from './support-rating.component';

describe('SupportRatingComponent', () => {
    let component: SupportRatingComponent;
    let fixture: ComponentFixture<SupportRatingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SupportRatingComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(SupportRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
