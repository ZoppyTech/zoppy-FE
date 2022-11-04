import { NgModule } from '@angular/core';
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
        RadioButtonModule
    ],
    declarations: [RegisterSalesComponent],
    exports: [RegisterSalesComponent]
})
export class RegisterSalesModule {}
