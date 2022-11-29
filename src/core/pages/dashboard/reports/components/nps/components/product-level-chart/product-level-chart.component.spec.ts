import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductLevelChartComponent } from './product-level-chart.component';

describe('ProductLevelChartComponent', () => {
    let component: ProductLevelChartComponent;
    let fixture: ComponentFixture<ProductLevelChartComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ProductLevelChartComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(ProductLevelChartComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
