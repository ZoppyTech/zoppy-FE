import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerComponent } from './customer.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';

const routes: Routes = [
    {
        path: '',
        component: CustomerComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, InputModule],
    declarations: [CustomerComponent],
    exports: [CustomerComponent]
})
export class CustomerModule {}
