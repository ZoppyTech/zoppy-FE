import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { NgChartsModule } from 'ng2-charts';
import { AbcCurveChartComponent } from './abc-curve-chart.component';

@NgModule({
    declarations: [AbcCurveChartComponent],
    imports: [CommonModule, DropdownModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    exports: [AbcCurveChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AbcCurveChartModule {}
