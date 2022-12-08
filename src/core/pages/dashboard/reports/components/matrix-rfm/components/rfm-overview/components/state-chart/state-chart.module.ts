import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateChartComponent } from './state-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule, IconModule],
    declarations: [StateChartComponent],
    exports: [StateChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StateChartModule {}
