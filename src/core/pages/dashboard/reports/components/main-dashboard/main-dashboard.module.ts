import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { SalesByStateModule } from './components/sales-by-state/sales-by-state.module';
import { DailySalesModule } from './components/daily-sales/daily-sales.module';
import { MonthlyInvoicesModule } from './components/monthly-invoices/monthly-invoices.module';
import { ReportCardModule } from './components/report-card/report-card.module';
import { SalesByGenderModule } from './components/sales-by-gender/sales-by-gender.module';
import { MainDashboardComponent } from './main-dashboard.component';

@NgModule({
    imports: [CommonModule, ReportCardModule, SalesByStateModule, SalesByGenderModule, MonthlyInvoicesModule, DailySalesModule],
    declarations: [MainDashboardComponent],
    exports: [MainDashboardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class MainDashboardModule {}
