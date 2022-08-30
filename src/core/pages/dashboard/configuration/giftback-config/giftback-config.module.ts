import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GiftbackConfigComponent } from './giftback-config.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { InputModule } from '@lucarrloliveira/input';

const routes: Routes = [
    {
        path: '',
        component: GiftbackConfigComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, InputModule],
    declarations: [GiftbackConfigComponent],
    exports: [GiftbackConfigComponent]
})
export class GiftbackConfigModule {}
