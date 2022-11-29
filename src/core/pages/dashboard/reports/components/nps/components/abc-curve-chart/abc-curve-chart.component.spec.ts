import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbcCurveChartComponent } from './abc-curve-chart.component';

describe('AbcCurveChartComponent', () => {
    let component: AbcCurveChartComponent;
    let fixture: ComponentFixture<AbcCurveChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AbcCurveChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(AbcCurveChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
