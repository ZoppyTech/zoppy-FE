import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatContactComponent } from './chat-contact.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { InputModule } from '@ZoppyTech/input';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, InputModule, VisualIdentityModule],
    declarations: [ChatContactComponent],
    exports: [ChatContactComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ChatContactModule {}
