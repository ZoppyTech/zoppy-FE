import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { Routes, RouterModule } from '@angular/router';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';

const routes: Routes = [
    {
        path: '',
        component: ProductsComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, RouterModule.forChild(routes), DropdownModule, InputModule, ButtonModule],
    declarations: [ProductsComponent],
    exports: [ProductsComponent]
})
export class ProductsModule {}
