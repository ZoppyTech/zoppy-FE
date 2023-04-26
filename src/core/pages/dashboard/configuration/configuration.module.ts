import { SignatureModule } from './../account/signature/signature.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { StandardGuard } from 'src/shared/guards/standard.guard';
import { RoleGuard } from 'src/shared/guards/role.guard';

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
            },
            {
                path: 'templates',
                loadChildren: () => import('./message-template/message-template.module').then((m: any) => m.MessageTemplateModule)
            },
            {
                path: 'whatsapp-setup',
                loadChildren: () => import('./whatsapp-config/whatsapp-config.module').then((m: any) => m.WhatsappConfigModule)
            },
            {
                path: 'whatsapp-template-list',
                loadChildren: () =>
                    import('./whatsapp-template-list/whatsapp-template-list.module').then((m: any) => m.WhatsappTemplateListModule)
            },
            {
                path: 'giftbacks',
                loadChildren: () => import('./giftbacks/giftbacks.module').then((m: any) => m.GiftbacksModule)
            },
            {
                path: 'batch-upload',
                loadChildren: () => import('./batch-upload-orders/batch-upload-orders.module').then((m: any) => m.BatchUploadOrdersModule)
            },
            {
                path: 'sync-data',
                loadChildren: () => import('./sync-data/sync-data.module').then((m: any) => m.SyncDataModule)
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
