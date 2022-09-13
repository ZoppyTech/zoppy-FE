import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list.component';
import { InputModule } from '@lucarrloliveira/input';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';

@NgModule({
    declarations: [ChatListComponent],
    imports: [CommonModule, InputModule, ButtonModule, IconModule],
    exports: [ChatListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatListModule {}
