import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyProfileComponent } from './my-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { ButtonModule } from '@ZoppyTech/button';

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
