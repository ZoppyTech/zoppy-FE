import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';

const routes: Routes = [
    {
        path: '',
        component: ChangePasswordComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IconModule, ButtonModule, InputModule, CarrosselModule],
    exports: [ChangePasswordComponent],
    declarations: [ChangePasswordComponent]
})
export class ChangePasswordModule {}
