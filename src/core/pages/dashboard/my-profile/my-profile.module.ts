import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '@lucarrloliveira/icon';
import { InputModule } from '@lucarrloliveira/input';
import { DatepickerModule } from '@lucarrloliveira/datepicker';
import { ButtonModule } from '@lucarrloliveira/button';

const routes: Routes = [
    {
        path: '',
        component: MyProfileComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, InputModule, DatepickerModule, ButtonModule, RouterModule.forChild(routes)],
    declarations: [MyProfileComponent],
    exports: [MyProfileComponent]
})
export class MyProfileModule {}
