import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmActionService } from '@lucarrloliveira/confirm-action';
import { ToastService } from '@lucarrloliveira/toast';
import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappContactService } from 'src/shared/services/whatsapp-contact/whatsapp-contact.service';
import { ChatContact } from '../../models/chat-contact';
import { Subcomponents } from '../../models/subcomponents';
import { WhatsappContactMapper } from './contact-mapper';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    @Input() public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    @Output() public currentSubcomponentChange: EventEmitter<Subcomponents> = new EventEmitter<Subcomponents>();
    @Output() public selectedContactEvent: EventEmitter<ChatContact> = new EventEmitter<ChatContact>();
    public hasContactsLoading: boolean = true;
    public hasSyncContactsLoading: boolean = false;
    public contacts: Array<ChatContact> = [];
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';

    public constructor(
        public readonly wppContactService: WhatsappContactService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService
    ) {}

    public async ngOnInit(): Promise<void> {
        console.log('Contact list loading...');
        await this.loadContacts();
        console.log(this.contacts);
        console.log('Contact list initialized!');
    }

    private sortAndGroup(): void {
        if (this.contacts.length <= 0) return;
        this.contacts[0].hasIndex = true;
        for (let i: number = 1; i < this.contacts.length; i++) {
            this.contacts[i].hasIndex =
                this.contacts[i].name.substring(0, 1).toUpperCase() !== this.contacts[i - 1].name.substring(0, 1).toUpperCase()
                    ? true
                    : false;
        }
    }

    public selectContact(contact: ChatContact): void {
        this.selectedContactEvent.emit(contact);
        this.goBack();
    }

    public async loadContacts(): Promise<void> {
        try {
            const entities: WhatsappContactEntity[] = await this.wppContactService.list();
            this.mapToContactView(entities);
            this.sortAndGroup();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.hasContactsLoading = false;
        }
    }

    public mapToContactView(entities: WhatsappContactEntity[]): void {
        this.contacts = WhatsappContactMapper.mapToView(entities);
    }

    public goBack(): void {
        this.currentSubcomponentChange.emit(Subcomponents.ChatList);
    }

    public async syncContacts(): Promise<void> {
        if (this.hasSyncContactsLoading) return;
        try {
            this.hasSyncContactsLoading = true;
            const entities: WhatsappContactEntity[] = await this.wppContactService.sync();
            this.mapToContactView(entities);
            this.sortAndGroup();
            this.toast.success(WhatsappConstants.ToastMessages.ContactsSyncSuccessfully, WhatsappConstants.ToastTitles.Success);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.hasSyncContactsLoading = false;
        }
    }
}

//TODO: Change ChatContact to WhatsappContactView
// export class ContactListView {
//     public hasIndex: boolean = false;
//     public name: string = '';
// }
