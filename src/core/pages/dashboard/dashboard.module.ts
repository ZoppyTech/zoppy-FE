import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { SideMenuModule } from './components/side-menu/side-menu.module';
import { TopBarModule } from './components/top-bar/top-bar.module';
import { DashboardGuard } from 'src/shared/guards/dashboard.guard';
import { PremiumGuard } from 'src/shared/guards/premium.guard';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [DashboardGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'home'
            },
            {
                path: 'home',
                loadChildren: () => import('./home/home.module').then((m: any) => m.HomeModule)
            },
            {
                path: 'reports',
                loadChildren: () => import('./reports/reports.module').then((m: any) => m.ReportsModule)
            },
            {
                path: 'configurations',
                loadChildren: () => import('./configuration/configuration.module').then((m: any) => m.ConfigurationModule)
            },
            {
                path: 'my-company',
                loadChildren: () => import('./my-company/my-company.module').then((m: any) => m.MyCompanyModule)
            },
            {
                path: 'profile',
                loadChildren: () => import('./my-profile/my-profile.module').then((m: any) => m.MyProfileModule)
            },
            {
                path: 'whatsapp',
                //canActivate: [PremiumGuard],
                loadChildren: () => import('./whatsapp/whatsapp.module').then((m: any) => m.WhatsappModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, SideMenuModule, TopBarModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    providers: [DashboardGuard, PremiumGuard]
})
export class DashboardModule {}
