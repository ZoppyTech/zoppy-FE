import { UpdatePasswordComponent } from './update-password.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';

const routes: Routes = [
    {
        path: '',
        component: UpdatePasswordComponent
    }
];

@NgModule({
    declarations: [UpdatePasswordComponent],
    exports: [UpdatePasswordComponent],
    imports: [CommonModule, IconModule, InputModule, DatepickerModule, ButtonModule, RouterModule.forChild(routes)]
})
export class UpdatePasswordModule {}
