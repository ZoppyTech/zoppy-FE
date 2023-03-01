import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyCompanyComponent } from './my-company.component';
import { Routes, RouterModule } from '@angular/router';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';

const routes: Routes = [
    {
        path: '',
        component: MyCompanyComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'config'
            },
            {
                path: 'config',
                loadChildren: () => import('./my-company-config/my-company-config.module').then((m: any) => m.MyCompanyConfigModule)
            },
            {
                path: 'users',
                loadChildren: () => import('./my-company-users/my-company-users.module').then((m: any) => m.MyCompanyUsersModule)
            },
            {
                path: 'users/config',
                loadChildren: () =>
                    import('./my-company-user-config/my-company-user-config.module').then((m: any) => m.MyCompanyUserConfigModule)
            },
            {
                path: 'users/config/:id',
                loadChildren: () =>
                    import('./my-company-user-config/my-company-user-config.module').then((m: any) => m.MyCompanyUserConfigModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), InputModule, ButtonModule],
    declarations: [MyCompanyComponent],
    exports: [MyCompanyComponent]
})
export class MyCompanyModule {}
