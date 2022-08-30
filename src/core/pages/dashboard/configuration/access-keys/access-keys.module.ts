import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessKeysComponent } from './access-keys.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { IconModule } from '@lucarrloliveira/icon';
import { ButtonModule } from '@lucarrloliveira/button';

const routes: Routes = [
    {
        path: '',
        component: AccessKeysComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule],
    declarations: [AccessKeysComponent],
    exports: [AccessKeysComponent]
})
export class AccessKeysModule {}