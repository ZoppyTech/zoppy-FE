import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsChartComponent } from './google-maps-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [GoogleMapsChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    exports: [GoogleMapsChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GoogleMapsChartModule {}
