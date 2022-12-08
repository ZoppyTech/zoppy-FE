import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPanelComponent } from './sales-panel.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { MultiSelectModule } from '@ZoppyTech/multi-select';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { SwitchModule } from '@ZoppyTech/switch';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { PipesModule } from 'src/shared/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: SalesPanelComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        RouterModule.forChild(routes),
        DropdownModule,
        VisualIdentityModule,
        CheckboxModule,
        ButtonModule,
        SwitchModule,
        InputModule,
        DatepickerModule,
        MultiSelectModule,
        RadioButtonModule,
        PipesModule
    ],
    declarations: [SalesPanelComponent],
    exports: [SalesPanelComponent]
})
export class SalesPanelModule {}
