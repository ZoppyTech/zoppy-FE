import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports.component';
import { Routes, RouterModule } from '@angular/router';
import { IconModule } from '@ZoppyTech/icon';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { SalesByStateModule } from './components/sales-by-state/sales-by-state.module';
import { SalesByGenderModule } from './components/sales-by-gender/sales-by-gender.module';
import { ReportCardModule } from './components/report-card/report-card.module';
import { MonthlyInvoicesModule } from './components/monthly-invoices/monthly-invoices.module';
import { DailySalesModule } from './components/daily-sales/daily-sales.module';
import { MatrixRfmModule } from './components/matrix-rfm/matrix-rfm.module';
import { NpsModule } from './components/nps/nps.module';
import { DemographicDataModule } from './components/demographic-data/demographic-data.module';

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
        NpsModule,
        DemographicDataModule,
        SalesByStateModule,
        SalesByGenderModule,
        ReportCardModule,
        MonthlyInvoicesModule,
        DailySalesModule,
        MatrixRfmModule,
        DropdownModule
    ],
    declarations: [ReportsComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
