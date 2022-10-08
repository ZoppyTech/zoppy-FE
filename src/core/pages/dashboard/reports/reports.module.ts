import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Routes, RouterModule } from '@angular/router';
import { IconModule } from '@ZoppyTech/icon';
import { SalesByStateModule } from './components/sales-by-state/sales-by-state.module';
import { SalesByGenderModule } from './components/sales-by-gender/sales-by-gender.module';
import { ContactListModule } from './components/contact-list/contact-list.module';
import { ReportCardModule } from './components/report-card/report-card.module';

const routes: Routes = [
    {
        path: '',
        component: ReportsComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        RouterModule.forChild(routes),
        SalesByStateModule,
        SalesByGenderModule,
        ContactListModule,
        ReportCardModule
    ],
    declarations: [ReportsComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
