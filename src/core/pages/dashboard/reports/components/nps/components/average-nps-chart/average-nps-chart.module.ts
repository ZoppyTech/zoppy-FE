import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AverageNpsChartComponent } from './average-nps-chart.component';

@NgModule({
    declarations: [AverageNpsChartComponent],
    imports: [CommonModule],
    exports: [AverageNpsChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AverageNpsChartModule {}
