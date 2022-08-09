import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { InputModule } from '@lucarrloliveira/input';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';
import { CheckboxModule } from '@lucarrloliveira/checkbox';

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
