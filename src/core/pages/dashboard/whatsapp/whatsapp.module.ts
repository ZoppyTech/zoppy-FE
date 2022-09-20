import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappComponent } from './whatsapp.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatListModule } from './components/chat-list/chat-list.module';
import { ContactListModule } from './components/contact-list/contact-list.module';
import { ChatRoomModule } from './components/chat-room/chat-room.module';
import { WelcomeChatModule } from './components/welcome-chat/welcome-chat.module';
import { ChatLoadingModule } from './components/chat-loading/chat-loading.module';

const routes: Routes = [
    {
        path: '',
        component: WhatsappComponent
    }
];

@NgModule({
    declarations: [WhatsappComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ChatLoadingModule,
        ChatListModule,
        ContactListModule,
        ChatRoomModule,
        WelcomeChatModule
    ],
    exports: [WhatsappComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class WhatsappModule {}
