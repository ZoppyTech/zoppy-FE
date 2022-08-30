import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ConfigurationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'access-keys'
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
                loadChildren: () => import('./sync-data/sync-data.module').then((m: any) => m.SyncDataModule)
            },
            {
                path: 'giftback',
                loadChildren: () => import('./giftback-config/giftback-config.module').then((m: any) => m.GiftbackConfigModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [ConfigurationComponent],
    exports: [ConfigurationComponent]
})
export class ConfigurationModule {}
