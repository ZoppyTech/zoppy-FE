import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatRoomComponent } from './chat-room.component';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { TextMessageModule } from './components/text-message/text-message.module';
import { BubbleInfoModule } from './components/bubble-info/bubble-info.module';
import { ThreadMessageModule } from './components/thread-message/thread-message.module';
import { SplitterDateModule } from './components/splitter-date/splitter-date.module';
import { ChatUtility } from './helpers/chat-utility';
import { ImageMessageModule } from './components/image-message/image-message.module';
import { AudioMessageModule } from './components/audio-message/audio-message.module';
import { DocumentMessageModule } from './components/document-message/document-message.module';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { CountdownTimerModule } from './components/countdown-timer/countdown-timer.module';

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
        BubbleInfoModule,
        ImageMessageModule,
        AudioMessageModule,
        DocumentMessageModule,
        StaticLoadingModule,
        CountdownTimerModule
    ],
    providers: [providers],
    exports: [ChatRoomComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatRoomModule {}
