import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IconModule } from '@ZoppyTech/icon';
import { StateChartComponent } from './state-chart.component';

@NgModule({
    imports: [CommonModule, IconModule],
    declarations: [StateChartComponent],
    exports: [StateChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StateChartModule {}
