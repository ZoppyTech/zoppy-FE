import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessKeysComponent } from './access-keys.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { CheckboxModule } from '@ZoppyTech/checkbox';

const routes: Routes = [
    {
        path: '',
        component: AccessKeysComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'access-tokens'
            },
            {
                path: 'nuvemshop/token',
                loadChildren: () =>
                    import('./nuvemshop-access-keys/nuvemshop-access-keys.module').then((m: any) => m.NuvemshopAccessKeysModule)
            }
        ]
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, InputModule, CheckboxModule],
    declarations: [AccessKeysComponent],
    exports: [AccessKeysComponent]
})
export class AccessKeysModule {}
