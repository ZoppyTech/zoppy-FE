import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductLevelChartComponent } from './product-level-chart.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    declarations: [ProductLevelChartComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    exports: [ProductLevelChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProductLevelChartModule {}