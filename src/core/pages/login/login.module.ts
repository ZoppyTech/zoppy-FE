import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { Routes, RouterModule } from '@angular/router';
import { IconModule } from '@lucarrloliveira/icon';
import { InputModule } from '@lucarrloliveira/input';
import { ButtonModule } from '@lucarrloliveira/button';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IconModule, InputModule, ButtonModule, CarrosselModule],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class LoginModule {}
