import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessTokensComponent } from './access-tokens.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { SwitchModule } from '@lucarrloliveira/switch';
import { InputModule } from '@lucarrloliveira/input';

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
