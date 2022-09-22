import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';

export interface ChatSocketData {
    action: ChatAction;
    message: WhatsappMessageEntity;
}

export type ChatAction = 'create' | 'update' | 'delete' | 'receive';
