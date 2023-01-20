import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTaskComponent } from './new-task.component';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { RadioButtonModule } from '@ZoppyTech/radio-button';

@NgModule({
    imports: [
        CommonModule,
        ButtonModule,
        IconModule,
        VisualIdentityModule,
        InputModule,
        DropdownModule,
        DatepickerModule,
        RadioButtonModule
    ],
    declarations: [NewTaskComponent],
    exports: [NewTaskComponent]
})
export class NewTaskModule {}
