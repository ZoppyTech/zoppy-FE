import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';
import { CheckboxModule } from '@ZoppyTech/checkbox';

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IconModule, InputModule, ButtonModule, CarrosselModule, CheckboxModule],
    declarations: [RegisterComponent]
})
export class RegisterModule {}
