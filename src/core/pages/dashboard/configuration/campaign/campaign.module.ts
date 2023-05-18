import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignComponent } from './campaign.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';

const routes: Routes = [
    {
        path: '',
        component: CampaignComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'config',
                loadChildren: () => import('./campaign-config/campaign-config.module').then((m: any) => m.CampaignConfigModule)
            },
            {
                path: 'list',
                loadChildren: () => import('./campaign-list/campaign-list.module').then((m: any) => m.CampaignListModule)
            }
        ]
    }
];

@NgModule({
    declarations: [CampaignComponent],
    exports: [CampaignComponent],
    imports: [CommonModule, RouterModule.forChild(routes), InputModule, ButtonModule]
})
export class CampaignModule {}
