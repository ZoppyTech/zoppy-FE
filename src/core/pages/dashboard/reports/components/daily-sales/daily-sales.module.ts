import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailySalesComponent } from './daily-sales.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
    imports: [CommonModule, NgChartsModule],
    declarations: [DailySalesComponent],
    exports: [DailySalesComponent]
})
export class DailySalesModule {}
