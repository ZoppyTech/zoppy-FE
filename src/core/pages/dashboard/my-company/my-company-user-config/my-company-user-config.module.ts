import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyUserConfigComponent } from './my-company-user-config.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@lucarrloliveira/button';
import { InputModule } from '@lucarrloliveira/input';
import { DatepickerModule } from '@lucarrloliveira/datepicker';
import { IconModule } from '@lucarrloliveira/icon';

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
