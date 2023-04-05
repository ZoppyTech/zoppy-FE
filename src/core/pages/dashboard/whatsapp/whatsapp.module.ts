import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA, Provider } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatListModule } from './components/chat-list/chat-list.module';
import { ChatLoadingModule } from './components/chat-loading/chat-loading.module';
import { ChatRoomModule } from './components/chat-room/chat-room.module';
import { ContactListModule } from './components/contact-list/contact-list.module';
import { RestrictedAccessModule } from './components/restricted-access/restricted-access.module';
import { UnregisteredContactListModule } from './components/unregistered-contact-list/unregistered-contact-list.module';
import { WelcomeChatModule } from './components/welcome-chat/welcome-chat.module';
import { ChatMapper } from './helpers/chat-mapper';
import { ChatSocket } from './helpers/chat-socket';
import { WhatsappComponent } from './whatsapp.component';

const providers: Provider[] = [ChatSocket, ChatMapper];

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
        WelcomeChatModule,
        RestrictedAccessModule,
        UnregisteredContactListModule
    ],
    exports: [WhatsappComponent],
    providers: [providers],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class WhatsappModule {}
