import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyComponent } from './my-company.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: MyCompanyComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [MyCompanyComponent],
    exports: [MyCompanyComponent]
})
export class MyCompanyModule {}
