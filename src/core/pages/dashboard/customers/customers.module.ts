import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { IconModule } from '@ZoppyTech/icon';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { InputModule } from '@ZoppyTech/input';

const routes: Routes = [
    {
        path: '',
        component: CustomersComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, RouterModule.forChild(routes), DropdownModule, InputModule, ButtonModule],
    declarations: [CustomersComponent],
    exports: [CustomersComponent]
})
export class CustomersModule {}
