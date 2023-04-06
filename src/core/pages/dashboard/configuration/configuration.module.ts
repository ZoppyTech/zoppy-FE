import { SignatureModule } from './../account/signature/signature.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { StandardGuard } from 'src/shared/guards/standard.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';
import { AppConstants } from '@ZoppyTech/utilities';

const routes: Routes = [
    {
        path: '',
        component: ConfigurationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'integrations'
            },
            {
                path: 'integrations',
                loadChildren: () => import('./integration/integration.module').then((m: any) => m.IntegrationModule)
            },
            {
                path: 'automations',
                loadChildren: () => import('./automation/automation.module').then((m: any) => m.AutomationModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [ConfigurationComponent],
    exports: [ConfigurationComponent],
    providers: [StandardGuard, RoleGuard]
})
export class ConfigurationModule {}
