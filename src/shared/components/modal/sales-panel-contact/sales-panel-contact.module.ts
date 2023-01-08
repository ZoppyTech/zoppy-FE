import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPanelContactComponent } from './sales-panel-contact.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { TooltipModule } from '@ZoppyTech/tooltip';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule, InputModule, RadioButtonModule, CheckboxModule, TooltipModule],
    declarations: [SalesPanelContactComponent],
    exports: [SalesPanelContactComponent]
})
export class SalesPanelContactModule {}
