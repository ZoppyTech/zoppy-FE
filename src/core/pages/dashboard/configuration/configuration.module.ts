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
                redirectTo: 'giftback'
            },
            {
                path: 'giftback',
                loadChildren: () => import('./giftback-config/giftback-config.module').then((m: any) => m.GiftbackConfigModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER, AppConstants.ROLES.ADMIN, AppConstants.ROLES.MANAGER]
                }
            },
            {
                path: 'access-keys',
                loadChildren: () => import('./access-keys/access-keys.module').then((m: any) => m.AccessKeysModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER, AppConstants.ROLES.ADMIN]
                }
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
                path: 'sync-data',
                loadChildren: () => import('./sync-data/sync-data.module').then((m: any) => m.SyncDataModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER, AppConstants.ROLES.ADMIN]
                }
            },
            {
                path: 'letalk',
                canActivate: [StandardGuard, RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER]
                },
                loadChildren: () => import('./letalk-config/letalk-config.module').then((m: any) => m.LetalkConfigModule)
            },
            {
                path: 'message-config',
                loadChildren: () => import('./message-config/message-config.module').then((m: any) => m.MessageConfigModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER, AppConstants.ROLES.ADMIN, AppConstants.ROLES.MANAGER]
                }
            },
            {
                path: 'whatsapp-setup',
                loadChildren: () => import('./whatsapp-config/whatsapp-config.module').then((m: any) => m.WhatsappConfigModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER]
                }
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
                loadChildren: () => import('./batch-upload-orders/batch-upload-orders.module').then((m: any) => m.BatchUploadOrdersModule),
                canActivate: [RoleGuard],
                data: {
                    roles: [AppConstants.ROLES.MASTER]
                }
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
