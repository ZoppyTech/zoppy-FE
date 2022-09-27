import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyUserConfigComponent } from './my-company-user-config.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { IconModule } from '@ZoppyTech/icon';

const routes: Routes = [
    {
        path: '',
        component: MyCompanyUserConfigComponent
    }
];

@NgModule({
    imports: [CommonModule, InputModule, RouterModule.forChild(routes), ButtonModule, DatepickerModule, IconModule],

    declarations: [MyCompanyUserConfigComponent],
    exports: [MyCompanyUserConfigComponent]
})
export class MyCompanyUserConfigModule {}
