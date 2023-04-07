import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseComponent } from './base.component';
import { ButtonModule } from '@ZoppyTech/button';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { PaginationModule } from '@ZoppyTech/pagination';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { SwitchModule } from '@ZoppyTech/switch';
import { Routes, RouterModule } from '@angular/router';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { TooltipModule } from '@ZoppyTech/tooltip';

const routes: Routes = [
    {
        path: '',
        component: BaseComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        DropdownModule,
        RouterModule.forChild(routes),
        InputModule,
        ButtonModule,
        SearchBarModule,
        SwitchModule,
        PaginationModule,
        StaticLoadingModule,
        CheckboxModule,
        TooltipModule,
        PipesModule
    ],
    declarations: [BaseComponent],
    exports: [BaseComponent]
})
export class BaseModule {}
