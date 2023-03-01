import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyConfigComponent } from './my-company-config.component';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: MyCompanyConfigComponent
    }
];

@NgModule({
    imports: [CommonModule, InputModule, RouterModule.forChild(routes), ButtonModule],
    declarations: [MyCompanyConfigComponent],
    exports: [MyCompanyConfigComponent]
})
export class MyCompanyConfigModule {}
