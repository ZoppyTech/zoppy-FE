import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardGuard } from 'src/shared/guards/dashboard.guard';
const routes: Routes = [
    {
        path: '',
        component: AccountComponent,
        canActivate: [DashboardGuard],
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'profile'
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
                path: 'signature',
                loadChildren: () => import('./signature/signature.module').then((m: any) => m.SignatureModule)
            },
            {
                path: 'change-password',
                loadChildren: () => import('./update-password/update-password.module').then((m: any) => m.UpdatePasswordModule)
            }
        ]
    }
];

@NgModule({
    declarations: [AccountComponent],
    exports: [AccountComponent],
    imports: [CommonModule, RouterModule.forChild(routes)]
})
export class AccountModule {}
