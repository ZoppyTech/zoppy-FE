import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDividerComponent } from './time-divider.component';

describe('TimeDividerComponent', () => {
    let component: TimeDividerComponent;
    let fixture: ComponentFixture<TimeDividerComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TimeDividerComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(TimeDividerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
