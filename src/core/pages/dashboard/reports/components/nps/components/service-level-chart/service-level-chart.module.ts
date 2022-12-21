import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ServiceLevelChartComponent } from './service-level-chart.component';

@NgModule({
    declarations: [ServiceLevelChartComponent],
    imports: [CommonModule],
    exports: [ServiceLevelChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ServiceLevelChartModule {}
