import { SignatureComponent } from './signature.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';

const routes: Routes = [
    {
        path: '',
        component: SignatureComponent
    }
];

@NgModule({
    declarations: [SignatureComponent],
    exports: [SignatureComponent],
    imports: [CommonModule, IconModule, InputModule, DatepickerModule, ButtonModule, RouterModule.forChild(routes)]
})
export class SignatureModule {}
