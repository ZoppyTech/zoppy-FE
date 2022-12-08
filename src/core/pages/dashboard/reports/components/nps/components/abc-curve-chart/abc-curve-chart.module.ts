import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AbcCurveChartComponent } from './abc-curve-chart.component';

@NgModule({
    declarations: [AbcCurveChartComponent],
    imports: [CommonModule],
    exports: [AbcCurveChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AbcCurveChartModule {}
