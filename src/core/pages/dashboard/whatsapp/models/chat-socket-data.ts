import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';

export interface ChatSocketData {
    action: ChatAction;
    message: WhatsappMessageEntity;
    queueCount?: number;
}

export type ChatAction = 'create' | 'update' | 'delete' | 'receive' | 'change_status' | 'new_conversation_count';
