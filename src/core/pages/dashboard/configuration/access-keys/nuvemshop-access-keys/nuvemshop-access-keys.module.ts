import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { NuvemshopAccessKeysComponent } from './nuvemshop-access-keys.component';

const routes: Routes = [
    {
        path: '',
        component: NuvemshopAccessKeysComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, InputModule, CheckboxModule],
    declarations: [NuvemshopAccessKeysComponent],
    exports: [NuvemshopAccessKeysComponent]
})
export class NuvemshopAccessKeysModule {}
