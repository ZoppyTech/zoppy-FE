import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportComponent } from './support.component';
import { ButtonModule } from '@ZoppyTech/button';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { PaginationModule } from '@ZoppyTech/pagination';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { SwitchModule } from '@ZoppyTech/switch';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        DropdownModule,
        InputModule,
        ButtonModule,
        SearchBarModule,
        SwitchModule,
        PaginationModule,
        StaticLoadingModule,
        CheckboxModule,
        PipesModule
    ],
    declarations: [SupportComponent],
    exports: [SupportComponent]
})
export class SupportModule {}
