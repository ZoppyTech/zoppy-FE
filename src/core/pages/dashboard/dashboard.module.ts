import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { SideMenuModule } from './components/side-menu/side-menu.module';
import { TopBarModule } from './components/top-bar/top-bar.module';
import { DashboardGuard } from 'src/shared/guards/dashboard.guard';
import { PremiumGuard } from 'src/shared/guards/premium.guard';
import { StandardGuard } from 'src/shared/guards/standard.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { AppConstants } from '@ZoppyTech/utilities';

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
                path: 'reports/:tab',
                loadChildren: () => import('./reports/reports.module').then((m: any) => m.ReportsModule)
            },
            {
                path: 'configurations',
                loadChildren: () => import('./configuration/configuration.module').then((m: any) => m.ConfigurationModule)
            },
            {
                path: 'account',
                loadChildren: () => import('./account/account.module').then((m: any) => m.AccountModule)
            },
            {
                path: 'access-tokens',
                loadChildren: () => import('./access-tokens/access-tokens.module').then((m: any) => m.AccessTokensModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER, AppConstants.ROLES.ADMIN]
                }
            },
            {
                path: 'sales',
                loadChildren: () => import('./register-sales/register-sales.module').then((m: any) => m.RegisterSalesModule)
            },
            {
                path: 'sales-panel',
                loadChildren: () => import('./sales-panel/sales-panel.module').then((m: any) => m.SalesPanelModule)
            },
            {
                path: 'sales/:phone',
                loadChildren: () => import('./register-sales/register-sales.module').then((m: any) => m.RegisterSalesModule)
            },
            {
                path: 'products',
                loadChildren: () => import('./products/products.module').then((m: any) => m.ProductsModule)
            },
            {
                path: 'products/add',
                loadChildren: () => import('./products/product/product.module').then((m: any) => m.ProductModule)
            },
            {
                path: 'products/:id',
                loadChildren: () => import('./products/product/product.module').then((m: any) => m.ProductModule)
            },
            {
                path: 'customers',
                loadChildren: () => import('./customers/customers.module').then((m: any) => m.CustomersModule)
            },
            {
                path: 'customers/add',
                loadChildren: () => import('./customers/customer/customer.module').then((m: any) => m.CustomerModule)
            },
            {
                path: 'customers/details/:id',
                loadChildren: () =>
                    import('./customers/customer-social-media/customer-social-media.module').then((m: any) => m.CustomerSocialMediaModule)
            },
            {
                path: 'customers/:id',
                loadChildren: () => import('./customers/customer/customer.module').then((m: any) => m.CustomerModule)
            },
            {
                path: 'whatsapp',
                loadChildren: () => import('./whatsapp/whatsapp.module').then((m: any) => m.WhatsappModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, SideMenuModule, TopBarModule],
    declarations: [DashboardComponent],
    exports: [DashboardComponent],
    providers: [DashboardGuard, PremiumGuard, StandardGuard, RoleGuard],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DashboardModule {}
