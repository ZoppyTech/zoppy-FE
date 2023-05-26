import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyChartComponent } from './empty-chart.component';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    declarations: [EmptyChartComponent],
    exports: [EmptyChartComponent],
    imports: [CommonModule, IconModule]
})
export class EmptyChartModule {}
