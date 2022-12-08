import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyerAgeChartComponent } from './buyer-age-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [BuyerAgeChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    exports: [BuyerAgeChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BuyerAgeChartModule {}
