import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Routes, RouterModule } from '@angular/router';
import { IconModule } from '@ZoppyTech/icon';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, RouterModule.forChild(routes)],
    declarations: [ReportsComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
