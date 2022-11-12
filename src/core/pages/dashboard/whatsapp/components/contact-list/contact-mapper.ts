import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { StringUtil } from 'src/shared/utils/string.util';
import { ChatContact } from '../../models/chat-contact';
import { WhatsappUtil } from '../../utils/whatsapp.util';

export class WhatsappContactMapper {
    public static mapToView(contacts: WhatsappContactEntity[]): ChatContact[] {
        return contacts.map((contact: WhatsappContactEntity) => {
            const mappedContact: ChatContact = new ChatContact();
            mappedContact.id = contact.id;
            mappedContact.firstName = contact.firstName;
            mappedContact.lastName = contact.lastName;
            mappedContact.displayName = StringUtil.buildFullName(contact.firstName, contact.lastName);
            mappedContact.displayPhone = WhatsappUtil.formatDisplayPhone(contact.countryCode, contact.subdivisionCode, contact.phoneNumber);
            mappedContact.hasIndex = false;
            mappedContact.isBlocked = contact.isBlocked;
            mappedContact.createdAt = contact.createdAt;
            mappedContact.companyId = contact.companyId;
            return mappedContact;
        });
    }
}
