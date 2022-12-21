import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IconModule } from '@ZoppyTech/icon';
import { SalesByStateChartComponent } from './sales-by-state-chart.component';

@NgModule({
    declarations: [SalesByStateChartComponent],
    imports: [CommonModule, IconModule],
    exports: [SalesByStateChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalesByStateChartModule {}
