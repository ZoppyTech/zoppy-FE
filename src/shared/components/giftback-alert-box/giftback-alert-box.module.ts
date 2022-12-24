import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftbackAlertBoxComponent } from './giftback-alert-box.component';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    imports: [CommonModule, IconModule],
    declarations: [GiftbackAlertBoxComponent],
    exports: [GiftbackAlertBoxComponent]
})
export class GiftbackAlertBoxModule {}
