import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterSalesComponent } from './register-sales.component';
import { RouterModule, Routes } from '@angular/router';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { SwitchModule } from '@ZoppyTech/switch';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { MultiSelectModule } from '@ZoppyTech/multi-select';

const routes: Routes = [
    {
        path: '',
        component: RegisterSalesComponent
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
        RadioButtonModule
    ],
    declarations: [RegisterSalesComponent],
    exports: [RegisterSalesComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RegisterSalesModule {}
