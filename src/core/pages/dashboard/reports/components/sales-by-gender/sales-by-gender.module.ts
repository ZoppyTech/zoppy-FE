import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesByGenderComponent } from './sales-by-gender.component';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, NgChartsModule],
    declarations: [SalesByGenderComponent],
    exports: [SalesByGenderComponent]
})
export class SalesByGenderModule {}
