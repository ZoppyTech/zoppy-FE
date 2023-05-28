import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySalesComponent } from './daily-sales.component';
import { NgChartsModule } from 'ng2-charts';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    imports: [CommonModule, NgChartsModule, EmptyChartModule],
    declarations: [DailySalesComponent],
    exports: [DailySalesComponent]
})
export class DailySalesModule {}
