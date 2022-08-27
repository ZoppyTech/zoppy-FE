import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { SideMenuModule } from './components/side-menu/side-menu.module';
import { TopBarModule } from './components/top-bar/top-bar.module';
import { DashboardGuard } from 'src/shared/guards/dashboard.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [DashboardGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'reports'
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then((m: any) => m.ReportsModule)
            },
            {
                path: 'configuration',
                loadChildren: () => import('./configuration/configuration.module').then((m: any) => m.ConfigurationModule)
            },
            {
                path: 'my-company',
                loadChildren: () => import('./my-company/my-company.module').then((m: any) => m.MyCompanyModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, SideMenuModule, TopBarModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    providers: [DashboardGuard]
})
export class DashboardModule {}