import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthlyInvoicesComponent } from './monthly-invoices.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    declarations: [MonthlyInvoicesComponent],
    exports: [MonthlyInvoicesComponent]
})
export class MonthlyInvoicesModule {}
