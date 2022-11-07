import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappTemplateListComponent } from './whatsapp-template-list.component';
import { RouterModule, Routes } from '@angular/router';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { DropdownModule } from '@ZoppyTech/dropdown';

const routes: Routes = [
    {
        path: '',
        component: WhatsappTemplateListComponent
    }
];

@NgModule({
    declarations: [WhatsappTemplateListComponent],
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, InputModule, DropdownModule],
    exports: [WhatsappTemplateListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class WhatsappTemplateListModule {}
