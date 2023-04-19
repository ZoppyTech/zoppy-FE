import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokensComponent } from './access-tokens.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { SwitchModule } from '@ZoppyTech/switch';
import { InputModule } from '@ZoppyTech/input';

const routes: Routes = [
    {
        path: '',
        component: AccessTokensComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, SwitchModule, InputModule],
    declarations: [AccessTokensComponent],
    exports: [AccessTokensComponent]
})
export class AccessTokensModule {}
