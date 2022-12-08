import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { DemographicDataModule } from './components/demographic-data/demographic-data.module';
import { MainDashboardModule } from './components/main-dashboard/main-dashboard.module';
import { MatrixRfmModule } from './components/matrix-rfm/matrix-rfm.module';
import { NpsModule } from './components/nps/nps.module';
import { ReportsComponent } from './reports.component';

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
        MainDashboardModule,
        DemographicDataModule,
        MatrixRfmModule,
        DropdownModule
    ],
    declarations: [ReportsComponent],
    exports: [ReportsComponent]
})
export class ReportsModule {}
