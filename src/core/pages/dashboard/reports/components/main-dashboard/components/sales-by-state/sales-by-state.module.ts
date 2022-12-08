import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByStateComponent } from './sales-by-state.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    declarations: [SalesByStateComponent],
    exports: [SalesByStateComponent]
})
export class SalesByStateModule {}
