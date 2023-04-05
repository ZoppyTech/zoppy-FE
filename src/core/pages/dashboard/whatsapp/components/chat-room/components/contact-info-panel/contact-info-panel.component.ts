import { ToastService } from '@ZoppyTech/toast';
import { PhoneNumberSliced, WhatsappConstants } from '@ZoppyTech/utilities';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { WhatsappContactService } from 'src/shared/services/whatsapp-contact/whatsapp-contact.service';
import { WhatsappUtil } from '../../../../utils/whatsapp.util';
import { ChatContact } from '../../../../models/chat-contact';

@Component({
    selector: 'contact-info-panel',
    templateUrl: './contact-info-panel.component.html',
    styleUrls: ['./contact-info-panel.component.scss']
})
export class ContactInfoPanelComponent implements OnInit {
    @Input() public close: boolean = false;
    @Output() public closeChange: EventEmitter<boolean> = new EventEmitter();
    @Input() public contact: ChatContact = new ChatContact();
    public declare contactInfo: WhatsappContactEntity;
    public contactInfoLoading: boolean = false;

    public constructor(protected readonly wppContactService: WhatsappContactService, public readonly toast: ToastService) {}

    public async ngOnInit(): Promise<void> {
        await this.loadContactInfo();
    }

    public async loadContactInfo(): Promise<void> {
        try {
            this.contactInfoLoading = true;
            this.contactInfo = await this.wppContactService.about(this.contact.id);
        } catch (ex: any) {
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.contactInfoLoading = false;
        }
    }

    public onCloseClicked(): void {
        this.close = false;
        this.closeChange.emit(this.close);
    }
}
