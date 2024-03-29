import { MultiSelectModule } from '@ZoppyTech/multi-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftbackConfigComponent } from './giftback-config.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { InputModule } from '@ZoppyTech/input';
import { SwitchModule } from '@ZoppyTech/switch';

const routes: Routes = [
    {
        path: '',
        component: GiftbackConfigComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VisualIdentityModule,
        SwitchModule,
        IconModule,
        ButtonModule,
        InputModule,
        MultiSelectModule
    ],
    declarations: [GiftbackConfigComponent],
    exports: [GiftbackConfigComponent]
})
export class GiftbackConfigModule {}
