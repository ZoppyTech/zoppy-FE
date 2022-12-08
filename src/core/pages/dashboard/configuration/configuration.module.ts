import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';
import { StandardGuard } from 'src/shared/guards/standard.guard';
import { HasProviderGuard } from 'src/shared/guards/has-provider.guard';

const routes: Routes = [
    {
        path: '',
        component: ConfigurationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'access-tokens'
            },
            {
                path: 'access-keys',
                loadChildren: () => import('./access-keys/access-keys.module').then((m: any) => m.AccessKeysModule)
            },
            {
                path: 'access-tokens',
                loadChildren: () => import('./access-tokens/access-tokens.module').then((m: any) => m.AccessTokensModule)
            },
            {
                path: 'sync-data',
                canActivate: [HasProviderGuard],
                loadChildren: () => import('./sync-data/sync-data.module').then((m: any) => m.SyncDataModule)
            },
            {
                path: 'giftback',
                loadChildren: () => import('./giftback-config/giftback-config.module').then((m: any) => m.GiftbackConfigModule)
            },
            {
                path: 'letalk',
                canActivate: [StandardGuard],
                loadChildren: () => import('./letalk-config/letalk-config.module').then((m: any) => m.LetalkConfigModule)
            },
            {
                path: 'message-config',
                loadChildren: () => import('./message-config/message-config.module').then((m: any) => m.MessageConfigModule)
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
                path: 'coupons',
                loadChildren: () => import('./giftbacks/giftbacks.module').then((m: any) => m.GiftbacksModule)
            },
            {
                path: 'batch-upload',
                loadChildren: () => import('./batch-upload-orders/batch-upload-orders.module').then((m: any) => m.BatchUploadOrdersModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [ConfigurationComponent],
    exports: [ConfigurationComponent],
    providers: [StandardGuard, HasProviderGuard]
})
export class ConfigurationModule {}
