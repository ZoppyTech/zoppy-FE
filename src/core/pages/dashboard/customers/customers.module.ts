import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import { IconModule } from '@ZoppyTech/icon';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { InputModule } from '@ZoppyTech/input';
import { PaginationModule } from '@ZoppyTech/pagination';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { GiftbackAlertBoxModule } from 'src/shared/components/giftback-alert-box/giftback-alert-box.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: CustomersComponent
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
        GiftbackAlertBoxModule,
        PipesModule
    ],
    declarations: [CustomersComponent],
    exports: [CustomersComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomersModule {}
