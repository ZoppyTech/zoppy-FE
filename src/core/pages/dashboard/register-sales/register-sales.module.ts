import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterSalesComponent } from './register-sales.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';

const routes: Routes = [
    {
        path: '',
        component: RegisterSalesComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, RouterModule.forChild(routes), DropdownModule],
    declarations: [RegisterSalesComponent],
    exports: [RegisterSalesComponent]
})
export class RegisterSalesModule {}
