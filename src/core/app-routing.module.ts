import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing'
    },
    {
        path: 'landing',
        loadChildren: () => import('./pages/landing/landing.module').then((m: any) => m.LandingModule)
    },
    {
        path: 'login',
        loadChildren: () => import('./pages/login/login.module').then((m: any) => m.LoginModule)
    },
    {
        path: 'change-password',
        loadChildren: () => import('./pages/change-password/change-password.module').then((m: any) => m.ChangePasswordModule)
    },
    {
        path: 'reset-password',
        loadChildren: () => import('./pages/reset-password/reset-password.module').then((m: any) => m.ResetPasswordModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./pages/dashboard/dashboard.module').then((m: any) => m.DashboardModule)
    },
    {
        path: 'register',
        loadChildren: () => import('./pages/register/register.module').then((m: any) => m.RegisterModule)
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
