import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatConversationTransferModalComponent } from './chat-conversation-transfer-modal.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { StaticLoadingModule } from '../../static-loading/static-loading.module';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule, StaticLoadingModule],
    declarations: [ChatConversationTransferModalComponent],
    exports: [ChatConversationTransferModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ChatConversationTransferModalModule {}
