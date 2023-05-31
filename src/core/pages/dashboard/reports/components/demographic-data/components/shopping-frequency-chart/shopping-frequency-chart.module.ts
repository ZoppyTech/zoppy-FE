import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ShoppingFrequencyChartComponent } from './shopping-frequency-chart.component';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    declarations: [ShoppingFrequencyChartComponent],
    imports: [CommonModule, EmptyChartModule],
    exports: [ShoppingFrequencyChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ShoppingFrequencyChartModule {}
