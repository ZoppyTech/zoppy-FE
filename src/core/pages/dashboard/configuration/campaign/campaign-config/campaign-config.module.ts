import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignConfigComponent } from './campaign-config.component';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { SwitchModule } from '@ZoppyTech/switch';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { InputFileModule } from '@ZoppyTech/input-file';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { TimepickerModule } from '@ZoppyTech/timepicker';
import { PreviewModule } from '@ZoppyTech/template-input';

const routes: Routes = [
    {
        path: '',
        component: CampaignConfigComponent
    }
];

@NgModule({
    declarations: [CampaignConfigComponent],
    exports: [CampaignConfigComponent],
    imports: [
        CommonModule,
        InputModule,
        RouterModule.forChild(routes),
        ButtonModule,
        IconModule,
        PipesModule,
        DropdownModule,
        InputFileModule,
        StaticLoadingModule,
        SwitchModule,
        TooltipModule,
        RadioButtonModule,
        DatepickerModule,
        TimepickerModule,
        PreviewModule
    ]
})
export class CampaignConfigModule {}
