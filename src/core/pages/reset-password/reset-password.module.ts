import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import { Routes, RouterModule } from '@angular/router';
import { IconModule } from '@lucarrloliveira/icon';
import { ButtonModule } from '@lucarrloliveira/button';
import { InputModule } from '@lucarrloliveira/input';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';

const routes: Routes = [
    {
        path: '',
        component: ResetPasswordComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IconModule, ButtonModule, InputModule, CarrosselModule],
    declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule {}
