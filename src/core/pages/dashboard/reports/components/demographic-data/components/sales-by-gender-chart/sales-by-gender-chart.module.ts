import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalesByGenderChartComponent } from './sales-by-gender-chart.component';

@NgModule({
    declarations: [SalesByGenderChartComponent],
    imports: [CommonModule],
    exports: [SalesByGenderChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalesByGenderChartModule {}
