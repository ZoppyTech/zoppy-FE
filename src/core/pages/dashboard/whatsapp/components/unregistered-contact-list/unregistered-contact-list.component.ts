import { Component, EventEmitter, Input, Output } from '@angular/core';
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
import { WhatsappMapper } from '../../whatsapp-mapper';
import { WhatsappContactMapper } from '../contact-list/contact-mapper';

@Component({
    selector: 'unregistered-contact-list',
    templateUrl: './unregistered-contact-list.component.html',
    styleUrls: ['./unregistered-contact-list.component.scss']
})
export class UnregisteredContactListComponent {
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
        public readonly wppContactService: WhatsappContactService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public modal: ModalService
    ) {}

    public async ngOnInit(): Promise<void> {
        console.log('Contact list loading...');
        this.filter.searchFields = ['firstName'];
        this.filter.pagination.page = 1;
        this.filter.pagination.pageSize = Number.MAX_SAFE_INTEGER;
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
        await this.loadContacts();
        this.syncHasDone = this.contacts.length > 0;
        console.log('Contact list initialized!');
    }

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        this.filter.searchText = searchText;
        await this.loadContacts();
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

    public selectContact(contact: ChatContact): void {
        this.selectedContactEvent.emit(contact);
        this.goBack();
    }

    // public openNewContactModal(): void {
    //     this.modal.open(
    //         Modal.IDENTIFIER.CHAT_CONTACT,
    //         {
    //             id: '',
    //             firstName: '',
    //             lastName: '',
    //             phoneNumber: '',
    //             isBlocked: false
    //         },
    //         (newContact: any) => {
    //             this.contacts.push(WhatsappMapper.mapContact(newContact));
    //         }
    //     );
    // }

    public async loadContacts(): Promise<void> {
        try {
            const response: ZoppyFilter<WhatsappContactEntity> = await this.wppContactService.findAllPaginated(this.filter);
            const entities: any = response.data;
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
