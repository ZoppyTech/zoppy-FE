import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceLevelChartComponent } from './service-level-chart.component';

describe('ServiceLevelChartComponent', () => {
    let component: ServiceLevelChartComponent;
    let fixture: ComponentFixture<ServiceLevelChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ServiceLevelChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ServiceLevelChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
