import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { IconModule } from '@ZoppyTech/icon';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { InputModule } from '@ZoppyTech/input';
import { DatepickerModule } from '@ZoppyTech/datepicker';

const routes: Routes = [
    {
        path: '',
        component: ProductComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        RouterModule.forChild(routes),
        DropdownModule,
        InputModule,
        ButtonModule,
        DatepickerModule,
        DropdownModule
    ],
    declarations: [ProductComponent],
    exports: [ProductComponent]
})
export class ProductModule {}
