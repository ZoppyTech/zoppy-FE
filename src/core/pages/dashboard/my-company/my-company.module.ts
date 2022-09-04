import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyComponent } from './my-company.component';
import { Routes, RouterModule } from '@angular/router';
import { InputModule } from '@lucarrloliveira/input';
import { ButtonModule } from '@lucarrloliveira/button';

const routes: Routes = [
    {
        path: '',
        component: MyCompanyComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InputModule, ButtonModule],
    declarations: [MyCompanyComponent],
    exports: [MyCompanyComponent]
})
export class MyCompanyModule {}
