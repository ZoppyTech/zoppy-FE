import { UserEntity } from './user.entity';
import { WhatsappAccountPhoneNumberEntity } from './whatsapp-account-phone-number.entity';
import { WhatsappAccountEntity } from './whatsapp-account.entity';

export class WhatsappAccountManagerEntity {
    public declare id: string;
    public declare userId: string;
    public declare wppAccountId: string;
    public declare wppPhoneNumberId: string;
    public declare userName: string;
    public declare role: string;
    public declare createdAt: Date;
    public declare updatedAt: Date;
    public declare deletedAt: Date;
    public declare companyId: string;
    public declare account: WhatsappAccountEntity;
    public declare accountPhone: WhatsappAccountPhoneNumberEntity;
    public declare user: UserEntity;
}
