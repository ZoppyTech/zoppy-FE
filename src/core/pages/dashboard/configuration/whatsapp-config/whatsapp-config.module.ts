import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappConfigComponent } from './whatsapp-config.component';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { RouterModule, Routes } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { DropdownModule } from '@ZoppyTech/dropdown';

const routes: Routes = [
    {
        path: '',
        component: WhatsappConfigComponent
    }
];

@NgModule({
    declarations: [WhatsappConfigComponent],
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, InputModule, DropdownModule],
    exports: [WhatsappConfigComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class WhatsappConfigModule {}
