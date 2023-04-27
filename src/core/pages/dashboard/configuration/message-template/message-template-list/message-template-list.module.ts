import { TooltipModule } from '@ZoppyTech/tooltip';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { MessageTemplateListComponent } from './message-template-list.component';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { SwitchModule } from '@ZoppyTech/switch';

const routes: Routes = [
    {
        path: '',
        component: MessageTemplateListComponent
    }
];

@NgModule({
    declarations: [MessageTemplateListComponent],
    exports: [MessageTemplateListComponent],
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
        TooltipModule
    ]
})
export class MessageTemplateListModule {}
