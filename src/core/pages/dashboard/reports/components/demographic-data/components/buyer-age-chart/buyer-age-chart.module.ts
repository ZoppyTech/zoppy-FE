import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BuyerAgeChartComponent } from './buyer-age-chart.component';

@NgModule({
    declarations: [BuyerAgeChartComponent],
    imports: [CommonModule],
    exports: [BuyerAgeChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BuyerAgeChartModule {}
