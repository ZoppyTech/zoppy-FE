import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomationComponent } from './automation.component';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { PaginationModule } from '@ZoppyTech/pagination';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { Routes, RouterModule } from '@angular/router';
import { PipesModule } from 'src/shared/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: AutomationComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        RouterModule.forChild(routes),
        DropdownModule,
        InputModule,
        ButtonModule,
        SearchBarModule,
        PaginationModule,
        PipesModule
    ],
    declarations: [AutomationComponent],
    exports: [AutomationComponent]
})
export class AutomationModule {}
