import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumerNpsChartComponent } from './consumer-nps-chart.component';

describe('ConsumerNpsChartComponent', () => {
    let component: ConsumerNpsChartComponent;
    let fixture: ComponentFixture<ConsumerNpsChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ConsumerNpsChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ConsumerNpsChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
