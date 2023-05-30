import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BuyerAgeChartComponent } from './buyer-age-chart.component';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    declarations: [BuyerAgeChartComponent],
    imports: [CommonModule, EmptyChartModule],
    exports: [BuyerAgeChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BuyerAgeChartModule {}
