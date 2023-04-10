import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatInputComponent } from './chat-input.component';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    imports: [CommonModule, IconModule],
    declarations: [ChatInputComponent],
    exports: [ChatInputComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ChatInputModule {}
