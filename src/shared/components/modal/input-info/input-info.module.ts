import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputInfoComponent } from './input-info.component';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { InputModule } from '@ZoppyTech/input';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule, InputModule],
    declarations: [InputInfoComponent],
    exports: [InputInfoComponent]
})
export class InputInfoModule {}
