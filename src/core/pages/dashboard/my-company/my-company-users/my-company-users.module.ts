import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyUsersComponent } from './my-company-users.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { IconModule } from '@ZoppyTech/icon';

const routes: Routes = [
    {
        path: '',
        component: MyCompanyUsersComponent
    }
];

@NgModule({
    imports: [CommonModule, InputModule, RouterModule.forChild(routes), ButtonModule, IconModule],

    declarations: [MyCompanyUsersComponent],
    exports: [MyCompanyUsersComponent]
})
export class MyCompanyUsersModule {}
