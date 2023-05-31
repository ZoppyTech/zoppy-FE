import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByGenderComponent } from './sales-by-gender.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule, EmptyChartModule],
    declarations: [SalesByGenderComponent],
    exports: [SalesByGenderComponent]
})
export class SalesByGenderModule {}
