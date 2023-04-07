import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
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
import { RouterModule, Routes } from '@angular/router';
import { MultiSelectModule } from '@ZoppyTech/multi-select';

const routes: Routes = [
    {
        path: '',
        component: FormComponent
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
        MultiSelectModule,
        PipesModule
    ],
    declarations: [FormComponent],
    exports: [FormComponent]
})
export class FormModule {}
