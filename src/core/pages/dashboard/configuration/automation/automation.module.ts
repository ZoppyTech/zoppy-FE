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
import { FormModule } from './form/form.module';
import { BaseModule } from './base/base.module';

const routes: Routes = [
    {
        path: '',
        component: AutomationComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'base'
            },
            {
                path: 'base',
                loadChildren: () => import('./base/base.module').then((m: any) => m.BaseModule)
            },
            {
                path: 'form',
                loadChildren: () => import('./form/form.module').then((m: any) => m.FormModule)
            },
            {
                path: 'form/:tab',
                loadChildren: () => import('./form/form.module').then((m: any) => m.FormModule)
            }
        ]
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
        PipesModule,
        BaseModule,
        FormModule
    ],
    declarations: [AutomationComponent],
    exports: [AutomationComponent]
})
export class AutomationModule {}
