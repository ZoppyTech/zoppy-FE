import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ConsumerNpsChartComponent } from './consumer-nps-chart.component';

@NgModule({
    declarations: [ConsumerNpsChartComponent],
    imports: [CommonModule],
    exports: [ConsumerNpsChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ConsumerNpsChartModule {}
