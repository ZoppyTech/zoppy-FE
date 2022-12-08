import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByGenderChartComponent } from './sales-by-gender-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [SalesByGenderChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    exports: [SalesByGenderChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SalesByGenderChartModule {}
