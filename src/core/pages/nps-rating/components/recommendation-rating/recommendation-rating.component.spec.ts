import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendationRatingComponent } from './recommendation-rating.component';

describe('RecommendationRatingComponent', () => {
    let component: RecommendationRatingComponent;
    let fixture: ComponentFixture<RecommendationRatingComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [RecommendationRatingComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(RecommendationRatingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
