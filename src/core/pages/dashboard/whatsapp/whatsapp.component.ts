import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@lucarrloliveira/confirm-action';
import { ToastService } from '@lucarrloliveira/toast';
import { timeInterval, timeout } from 'rxjs';
import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WhatsappAccountManagerService } from 'src/shared/services/whatsapp-account-manager/whatsapp-account-manager.service';
import { WhatsappAccountPhoneNumberService } from 'src/shared/services/whatsapp-account-phone-number/whatsapp-account-phone-number.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { WhatsappContactService } from 'src/shared/services/whatsapp-contact/whatsapp-contact.service';
import { WhatsappMessageService } from 'src/shared/services/whatsapp-message/whatsapp-message.service';
import { DateUtil } from 'src/shared/utils/date.util';
import { Storage } from 'src/shared/utils/storage';
import { ChatAccount } from './models/chat-account';
import { ChatContact } from './models/chat-contact';
import { ChatManager } from './models/chat-manager';
import { ChatRoom } from './models/chat-room';
import { Subcomponents } from './models/subcomponents';
import { ThreadMessage } from './models/thread-message';
import { WhatsappMapper } from './whatsapp-mapper';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
    public user: UserEntity = new UserEntity();
    public readonly subcomponents = Subcomponents;
    public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    public whatsappPercentLoading: number = 0;
    public whatsappLoading: boolean = true;

    public contacts: Array<ChatContact> = [];
    public declare contactSelected: ChatContact;

    public conversations: Map<string, ChatRoom> = new Map();
    public declare chatRoomSelected: ChatRoom;

    public manager: ChatManager = new ChatManager();
    public account: ChatAccount = new ChatAccount();

    //TODO: Change to WhatsappChat

    public constructor(
        public readonly wppAccountService: WhatsappAccountService,
        public readonly wppAccountPhoneNumberService: WhatsappAccountPhoneNumberService,
        public readonly wppAccountManagerService: WhatsappAccountManagerService,
        public readonly wppContactService: WhatsappContactService,
        public readonly wppMessageService: WhatsappMessageService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public readonly sideMenuService: SideMenuService,
        public readonly breadcrumb: BreadcrumbService,
        public readonly storage: Storage
    ) {
        //no content
    }

    public async ngOnInit(): Promise<void> {
        console.log('Whatsapp loading...');
        this.setLoggedUser();
        this.setBreadcrumb();
        await this.loadRegisteredWhatsappAccount();
        await this.loadBusinessAccounManager();
        await this.loadConversations();
        await this.setWhatsappLoading();
        console.log('Whatsapp initialized!');
    }

    public onSendingMessage(event: any): void {
        debugger;
        this.toast.success('Sending Message...', 'Whatsapp Message');
        console.log(event);
    }

    public onContactSelected(event: any): void {
        console.log('On Contact Selected!');
        debugger;
        console.log(event);
        this.contactSelected = event;
        if (!this.conversations.has(this.contactSelected.id)) {
            const newChatRoom: ChatRoom = new ChatRoom();
            newChatRoom.contact = this.contactSelected;
            newChatRoom.manager = this.manager;
            newChatRoom.threads = [];
            const sortByMostRecent: Array<[string, ChatRoom]> = Array.from(this.conversations.entries());
            sortByMostRecent.unshift([this.contactSelected.id, newChatRoom]);
            this.conversations = new Map(sortByMostRecent);
        }
        this.chatRoomSelected = this.conversations.get(this.contactSelected.id) ?? new ChatRoom();
    }

    public onConversationSelected(event: any): void {
        this.chatRoomSelected = event;
    }

    public async loadRegisteredWhatsappAccount(): Promise<void> {
        try {
            console.log('Loading Whatsapp account!');
            const entity: WhatsappAccountEntity = await this.wppAccountService.getRegisteredByCompany();
            this.account = {
                id: entity.id,
                businessName: entity.businessName,
                active: entity.active
            };
            console.log(this.account);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 25;
        }
    }

    public async loadBusinessAccounManager(): Promise<void> {
        try {
            console.log('Loading Whatsapp manager!');
            const entity: WhatsappAccountManagerEntity = await this.wppAccountManagerService.findByLoggedUser(this.account.id);
            this.manager = {
                id: entity.id,
                name: this.user.name,
                phoneNumberId: entity.wppPhoneNumberId,
                accountId: entity.wppAccountId
            };
            console.log(this.manager);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 50;
        }
    }

    public async loadConversations(): Promise<void> {
        try {
            console.log('Loading Whatsapp conversations!');
            const entities: WhatsappMessageEntity[] = await this.wppMessageService.listByPhoneNumberId(this.manager.phoneNumberId);
            this.conversations = WhatsappMapper.mapConversations(this.manager, entities);
            console.log(entities);
            console.log(this.conversations);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 100;
        }
    }

    private setLoggedUser(): void {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: 'Início',
                route: '/dashboard/reports'
            },
            {
                name: 'Whatsapp',
                route: '/dashboard/whatsapp'
            }
        ];
        this.sideMenuService.change('whatsapp');
        this.sideMenuService.changeSub('none');
    }

    private async setWhatsappLoading(): Promise<void> {
        await DateUtil.delay(1000);
        this.whatsappLoading = false;
    }
}
