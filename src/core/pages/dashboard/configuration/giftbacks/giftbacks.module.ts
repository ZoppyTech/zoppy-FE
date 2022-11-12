import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftbacksComponent } from './giftbacks.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { PaginationModule } from '@ZoppyTech/pagination';
import { SearchBarModule } from '@ZoppyTech/search-bar';

const routes: Routes = [
    {
        path: '',
        component: GiftbacksComponent
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
        PaginationModule
    ],
    declarations: [GiftbacksComponent],
    exports: [GiftbacksComponent]
})
export class GiftbacksModule {}
