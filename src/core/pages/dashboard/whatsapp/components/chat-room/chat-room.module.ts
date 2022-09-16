import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { InputModule } from '@lucarrloliveira/input';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { TextMessageModule } from './components/text-message/text-message.module';
import { BubbleInfoModule } from './components/bubble-info/bubble-info.module';
import { ThreadMessageModule } from './components/thread-message/thread-message.module';
import { SplitterDateModule } from './components/splitter-date/splitter-date.module';
import { ChatUtility } from './helpers/chat-utility';

const providers: Provider[] = [ChatUtility];

@NgModule({
    declarations: [ChatRoomComponent],
    imports: [
        CommonModule,
        InputModule,
        ButtonModule,
        IconModule,
        TextMessageModule,
        SplitterDateModule,
        ThreadMessageModule,
        BubbleInfoModule
    ],
    providers: [providers],
    exports: [ChatRoomComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatRoomModule {}
