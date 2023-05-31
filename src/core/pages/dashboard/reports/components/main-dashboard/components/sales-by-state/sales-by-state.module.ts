import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByStateComponent } from './sales-by-state.component';
import { IconModule } from '@ZoppyTech/icon';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    imports: [CommonModule, IconModule, EmptyChartModule],
    declarations: [SalesByStateComponent],
    exports: [SalesByStateComponent]
})
export class SalesByStateModule {}
