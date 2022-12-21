import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ProductLevelChartComponent } from './product-level-chart.component';

@NgModule({
    declarations: [ProductLevelChartComponent],
    imports: [CommonModule],
    exports: [ProductLevelChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProductLevelChartModule {}
