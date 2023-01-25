import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageConfigParamsComponent } from './message-config-params.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { InputModule } from '@ZoppyTech/input';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule, InputModule],
    declarations: [MessageConfigParamsComponent],
    exports: [MessageConfigParamsComponent]
})
export class MessageConfigParamsModule {}
