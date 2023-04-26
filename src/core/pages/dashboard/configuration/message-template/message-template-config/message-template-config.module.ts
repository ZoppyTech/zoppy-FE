import { MessageTemplateConfigComponent } from './message-template-config.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';

const routes: Routes = [
    {
        path: '',
        component: MessageTemplateConfigComponent
    }
];

@NgModule({
    declarations: [MessageTemplateConfigComponent],
    exports: [MessageTemplateConfigComponent],
    imports: [
        CommonModule,
        InputModule,
        RouterModule.forChild(routes),
        ButtonModule,
        IconModule,
        PipesModule,
        DropdownModule,
        StaticLoadingModule
    ]
})
export class MessageTemplateConfigModule {}
