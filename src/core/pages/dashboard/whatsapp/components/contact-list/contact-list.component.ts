import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappConstants } from '@ZoppyTech/utilities';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { ZoppyFilter } from 'src/shared/models/filter';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappContactService } from 'src/shared/services/whatsapp-contact/whatsapp-contact.service';
import { ChatContact } from '../../models/chat-contact';
import { Subcomponents } from '../../models/subcomponents';
import { WhatsappContactMapper } from './contact-mapper';
import { ChatMapper } from '../../helpers/chat-mapper';

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
    public syncHasDone: boolean = false;
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';
    public filter: ZoppyFilter<WhatsappContactEntity> = new ZoppyFilter<WhatsappContactEntity>();

    public constructor(
        public readonly chatMapper: ChatMapper,
        public readonly wppContactService: WhatsappContactService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public modal: ModalService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.filter.searchFields = ['firstName'];
        this.filter.pagination.page = 1;
        this.filter.pagination.pageSize = 400;
        this.filter.orderBy = [
            {
                property: 'firstName',
                direction: 'ASC'
            },
            {
                property: 'lastName',
                direction: 'ASC'
            }
        ];
        const contacts: WhatsappContactEntity[] = await this.loadContacts();
        this.pushContacts(this.mapToContactView(contacts));
        this.sortAndGroup();
        this.syncHasDone = this.contacts.length > 0;
        this.hasContactsLoading = false;
    }

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        this.hasContactsLoading = true;
        this.filter.searchText = searchText;
        this.filter.pagination.reset();
        this.contacts = [];
        const contacts: WhatsappContactEntity[] = await this.loadContacts();
        this.pushContacts(this.mapToContactView(contacts));
        this.sortAndGroup();
        this.hasContactsLoading = false;
    }

    public async onScroll(): Promise<boolean> {
        this.hasContactsLoading = true;
        if (this.filter.pagination.endOfPage()) {
            this.hasContactsLoading = false;
            return true;
        }
        const contacts: WhatsappContactEntity[] = await this.loadContacts();
        this.filter.pagination.increasePage();
        this.pushContacts(this.mapToContactView(contacts));
        this.sortAndGroup();
        this.hasContactsLoading = false;
        return true;
    }

    private sortAndGroup(): void {
        if (this.contacts.length <= 0) return;
        this.contacts[0].hasIndex = true;
        for (let i: number = 1; i < this.contacts.length; i++) {
            this.contacts[i].hasIndex =
                this.contacts[i].displayName.substring(0, 1).toUpperCase() !==
                this.contacts[i - 1].displayName.substring(0, 1).toUpperCase()
                    ? true
                    : false;
        }
    }

    private pushContacts(contacts: ChatContact[]): void {
        if (this.contacts.length <= 0) {
            this.contacts.push(...contacts);
            return;
        }
        const newContacts: ChatContact[] = contacts.filter((newContact: ChatContact) => {
            return this.contacts.findIndex((contact: ChatContact) => contact.id === newContact.id) === -1;
        });
        if (newContacts.length <= 0) return;
        this.contacts.push(...newContacts);
    }

    public selectContact(contact: ChatContact): void {
        this.selectedContactEvent.emit(contact);
        this.goBack();
    }

    public openNewContactModal(): void {
        this.modal.open(
            Modal.IDENTIFIER.CHAT_CONTACT,
            {
                id: '',
                firstName: '',
                lastName: '',
                phone: '',
                isBlocked: false
            },
            (newContact: any) => {
                this.contacts.push(this.chatMapper.mapContact(newContact));
            }
        );
    }

    public async loadContacts(): Promise<WhatsappContactEntity[]> {
        try {
            const response: ZoppyFilter<WhatsappContactEntity> = await this.wppContactService.findAllPaginated(this.filter);
            this.filter.pagination.updatePagination(response.pagination);
            return response.data;
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            return [];
        }
    }

    public mapToContactView(entities: WhatsappContactEntity[]): ChatContact[] {
        return WhatsappContactMapper.mapToView(entities);
    }

    public goBack(): void {
        this.currentSubcomponentChange.emit(Subcomponents.ChatList);
    }

    public async syncContacts(): Promise<void> {
        if (this.hasSyncContactsLoading) return;
        try {
            this.hasSyncContactsLoading = true;
            const contacts: WhatsappContactEntity[] = await this.wppContactService.sync();
            this.pushContacts(this.mapToContactView(contacts));
            this.sortAndGroup();
            this.syncHasDone = true;
            this.toast.success(WhatsappConstants.ToastMessages.ContactsSyncSuccessfully, WhatsappConstants.ToastTitles.Success);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.hasSyncContactsLoading = false;
        }
    }
}
