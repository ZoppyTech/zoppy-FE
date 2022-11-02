import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetalkConfigComponent } from './letalk-config.component';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { SwitchModule } from '@ZoppyTech/switch';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';

const routes: Routes = [
    {
        path: '',
        component: LetalkConfigComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, SwitchModule, InputModule],
    exports: [LetalkConfigComponent],
    declarations: [LetalkConfigComponent]
})
export class LetalkConfigModule {}
