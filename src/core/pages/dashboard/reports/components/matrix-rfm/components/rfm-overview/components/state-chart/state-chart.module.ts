import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { IconModule } from '@ZoppyTech/icon';
import { StateChartComponent } from './state-chart.component';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    imports: [CommonModule, IconModule, EmptyChartModule],
    declarations: [StateChartComponent],
    exports: [StateChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class StateChartModule {}
