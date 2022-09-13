import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { InputModule } from '@lucarrloliveira/input';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';

@NgModule({
    declarations: [ChatRoomComponent],
    imports: [CommonModule, InputModule, ButtonModule, IconModule],
    exports: [ChatRoomComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatRoomModule {}
