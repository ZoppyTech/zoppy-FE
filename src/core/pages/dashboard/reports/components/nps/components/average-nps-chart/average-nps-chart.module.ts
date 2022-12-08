import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AverageNpsChartComponent } from './average-nps-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [AverageNpsChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    exports: [AverageNpsChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AverageNpsChartModule {}
