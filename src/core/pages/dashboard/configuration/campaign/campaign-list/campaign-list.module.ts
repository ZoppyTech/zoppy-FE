import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { SwitchModule } from '@ZoppyTech/switch';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { PaginationModule } from '@ZoppyTech/pagination';
import { EmptyListModule } from 'src/shared/components/empty-list/empty-list.module';

const routes: Routes = [
    {
        path: '',
        component: CampaignListComponent
    }
];

@NgModule({
    declarations: [CampaignListComponent],
    exports: [CampaignListComponent],
    imports: [
        CommonModule,
        InputModule,
        RouterModule.forChild(routes),
        ButtonModule,
        IconModule,
        PipesModule,
        DropdownModule,
        StaticLoadingModule,
        SwitchModule,
        TooltipModule,
        SearchBarModule,
        PaginationModule,
        EmptyListModule
    ]
})
export class CampaignListModule {}
