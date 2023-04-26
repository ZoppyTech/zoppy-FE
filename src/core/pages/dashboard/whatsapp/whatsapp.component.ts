import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants, WhatsappConstants } from '@ZoppyTech/utilities';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappTemplateMessageRequest } from 'src/shared/models/requests/whatsapp-message/whatsapp-template-message.request';
import { WhatsappTextMessageRequest } from 'src/shared/models/requests/whatsapp-message/whatsapp-text-message.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WebSocketService } from 'src/shared/services/websocket/websocket.service';
import { WhatsappAccountManagerService } from 'src/shared/services/whatsapp-account-manager/whatsapp-account-manager.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { WhatsappConversationService } from 'src/shared/services/whatsapp-conversation/whatsapp-conversation.service';
import { WhatsappMessageService } from 'src/shared/services/whatsapp-message/whatsapp-message.service';
import { Storage } from 'src/shared/utils/storage';
import { ChatHandler } from './helpers/chat-handler';
import { ChatMapper } from './helpers/chat-mapper';
import { ChatSocket } from './helpers/chat-socket';
import { ChatAccount } from './models/chat-account';
import { ChatContact } from './models/chat-contact';
import { ChatFilters } from './models/chat-filters';
import { ChatManager } from './models/chat-manager';
import { ChatRoom } from './models/chat-room';
import { Subcomponents } from './models/subcomponents';
import { ThreadMessage } from './models/thread-message';
import { WhatsappUtil } from './utils/whatsapp.util';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit, OnDestroy {
    public account: ChatAccount = new ChatAccount();
    public manager: ChatManager = new ChatManager();
    public user: UserEntity = new UserEntity();

    public readonly subcomponents = Subcomponents;
    public currentSubcomponent: Subcomponents = Subcomponents.ChatList;

    public queueCount: number = 0;
    public selectedFilter: string = ChatFilters.InProgress;

    public scrollDownEvent: Subject<void> = new Subject<void>();

    public isAdmin: boolean = false;
    public whatsappLoading: boolean = true;
    public whatsappPercentLoading: number = 0;
    public isWhatsappActive: boolean = false;
    public filterLoading: boolean = false;
    public pullLoading: boolean = false;
    public isChatRoomVisible: boolean = false;
    public openConversationMobile: boolean = false;

    public declare chathandler: ChatHandler;
    public rooms: Map<string, ChatRoom> = new Map();
    public declare roomSelected: ChatRoom;
    public contacts: Array<ChatContact> = [];
    public declare contactSelected: ChatContact;

    public constructor(
        public readonly chatSocket: ChatSocket,
        public readonly chatMapper: ChatMapper,
        public readonly wppAccountService: WhatsappAccountService,
        public readonly wppAccountManagerService: WhatsappAccountManagerService,
        public readonly wppConversationService: WhatsappConversationService,
        public readonly wppMessageService: WhatsappMessageService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public readonly sideMenuService: SideMenuService,
        public readonly breadcrumb: BreadcrumbService,
        public readonly storage: Storage,
        public readonly webSocketService: WebSocketService
    ) {
        this.chathandler = ChatHandler.create(this);
    }

    public async ngOnInit(): Promise<void> {
        this.setLoggedUser();
        this.setBreadcrumb();
        await this.onStartWhatsapp();
    }

    public async onStartWhatsapp(): Promise<void> {
        await this.loadRegisteredWhatsappAccount();
        if (!this.isWhatsappActive) {
            this.whatsappLoading = false;
            return;
        }
        await this.loadBusinessAccounManager();
        await this.loadConversations();
        await this.countUnstarted();
        this.setWebSocket();
        this.whatsappLoading = false;
    }

    public ngOnDestroy(): void {
        this.chatSocket.disconnect();
    }

    public destroyAndReload(): void {
        this.isChatRoomVisible = false;
        setTimeout(() => {
            this.isChatRoomVisible = true;
        }, 1);
    }

    public setWebSocket(): void {
        this.chatSocket.connect(this.webSocketService);
        this.chatSocket.onNewConversationCount = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            this.queueCount = response.queueCount ?? 0;
        };
        this.chatSocket.onUpdate = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            const targetRoom: ChatRoom | undefined = this.rooms.get(response.message.wppContactId);
            if (!targetRoom) return;
            const messageFound: ThreadMessage | undefined = targetRoom.findThreadById(response.message.id);
            if (!messageFound) return;
            messageFound.status = response.message.status;
        };
        this.chatSocket.onReceive = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            const targetRoom: ChatRoom | undefined = this.rooms.get(response.message.wppContactId);
            if (!targetRoom && !this.isAdmin) return;
            if (!targetRoom) {
                this.loadConversationByContact(response.message.wppContactId);
                return;
            }
            const receivedThread: ThreadMessage = this.chatMapper.mapMessage(response.message);
            targetRoom.addThread(receivedThread);
            targetRoom.setFirstMessagesOfDay();
            this.chathandler.setRoomAsMostRecent(targetRoom);
            this.scrollDownEvent.next();
            if (targetRoom.contact.id !== this.roomSelected.contact.id) return;
            this.chathandler.updateUnreadMessages(this.roomSelected);
        };
        this.chatSocket.onTransferRoom = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            if (!this.isAdmin && response.message.wppManagerId !== this.manager.id) return;
            this.loadConversationByContact(response.message.wppContactId);
        };
        this.chatSocket.onUpdateCurrentRoom = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            if (response.message.wppContactId !== this.roomSelected.contact.id) return;
            this.destroyAndReload();
        };
        this.chatSocket.onUpdateRoomManager = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            if (!this.isAdmin) return;
            const targetRoom: ChatRoom | undefined = this.rooms.get(response.message.wppContactId);
            if (!targetRoom) return;
            targetRoom.manager = this.chatMapper.mapManager(response.message.manager);
            this.chathandler.updateChatList();
        };
        this.chatSocket.onFinishedRoom = (response: any) => {
            if (response.message.companyId !== this.account.companyId) return;
            this.chathandler.removeRoom(response.message.wppContactId);
        };
        this.chatSocket.listen();
    }

    public async onSendingMessage(thread: ThreadMessage): Promise<void> {
        try {
            this.roomSelected.addThread(thread);
            this.roomSelected.setFirstMessagesOfDay();
            this.chathandler.sortRoomsByMostRecentMessages();
            this.scrollDownEvent.next();

            if (thread.type === WhatsappConstants.MessageType.Template) {
                const request: WhatsappTemplateMessageRequest = this.buildTemplateMessageRequestFrom(thread);
                await this.wppMessageService.createTemplateMessage(request);
                return;
            }
            const request: WhatsappTextMessageRequest = this.buildTextMessageRequestFrom(thread);
            await this.wppMessageService.createTextMessage(request);

            if (!this.roomSelected.manager) {
                this.chathandler.updateRoomManager(this.roomSelected);
            }
        } catch (ex: any) {
            this.roomSelected.removeThreadById(thread.id);
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        }
    }

    public onContactSelected(contact: ChatContact): void {
        this.contactSelected = contact;
        if (!this.rooms.has(this.contactSelected.id)) {
            const newRoom: ChatRoom = new ChatRoom();
            newRoom.contact = this.contactSelected;
            newRoom.manager = this.manager;
            newRoom.threads = [];
            this.chathandler.setRoomAsMostRecent(newRoom);
        }
        if (this.roomSelected) this.roomSelected.actived = false;
        this.roomSelected = this.rooms.get(this.contactSelected.id) ?? new ChatRoom();
        this.roomSelected.actived = true;
        this.scrollDownEvent.next();
        this.openConversationMobile = true;
        this.roomSelected.selectedByContactListView = true;
        this.destroyAndReload();
    }

    public onConversationSelected(room: ChatRoom): void {
        if (this.roomSelected) this.roomSelected.actived = false;
        this.roomSelected = room;
        this.roomSelected.actived = true;
        this.scrollDownEvent.next();
        this.chathandler.updateUnreadMessages(this.roomSelected);
        this.openConversationMobile = true;
        this.roomSelected.selectedByContactListView = false;
        this.destroyAndReload();
    }

    public onFinishRoom(contactId: string): void {
        this.chathandler.removeRoom(contactId);
        this.chathandler.updateNewConversationCount();
    }

    public async onPullNewConversationButtonClicked(): Promise<void> {
        try {
            if (this.pullLoading) return;
            this.pullLoading = true;
            const entity: WhatsappConversationEntity = await this.wppConversationService.pull();
            const newRoom: ChatRoom = this.chathandler.addRoom(entity, true);
            this.chathandler.setRoomAsMostRecent(newRoom);
            this.chathandler.updateNewConversationCount();
            this.chathandler.updateRoomManager(newRoom);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.pullLoading = false;
        }
    }

    public async onFilterChange(filter: string): Promise<void> {
        this.filterLoading = true;
        switch (filter) {
            case ChatFilters.Unread:
                await this.loadConversations();
                this.filterUnreadConversations();
                break;
            case ChatFilters.Finished:
                await this.loadFinishedConversations();
                break;
            case ChatFilters.InProgress:
                await this.loadConversations();
                break;
            case ChatFilters.Waiting:
                await this.loadUnstartedConversations();
                break;
        }
        this.filterLoading = false;
    }

    public async countUnstarted(): Promise<void> {
        try {
            this.queueCount = await this.wppConversationService.countUnstarted();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 100;
        }
    }

    public async loadRegisteredWhatsappAccount(): Promise<void> {
        try {
            const entity: WhatsappAccountEntity = await this.wppAccountService.getRegisteredByCompany();
            this.account = {
                id: entity.id,
                businessName: entity.businessName,
                scenario: entity.scenario,
                active: entity.active,
                companyId: entity.companyId
            };
            this.setWhatsappActive();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 25;
        }
    }

    public async loadBusinessAccounManager(): Promise<void> {
        try {
            const entity: WhatsappAccountManagerEntity = await this.wppAccountManagerService.findByLoggedUser(this.account.id);
            this.manager = {
                id: entity.id,
                name: this.user.name,
                wppPhoneNumberId: entity.wppPhoneNumberId,
                wppAccountId: entity.wppAccountId
            };
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 50;
        }
    }

    public async loadConversations(): Promise<void> {
        try {
            const entities: WhatsappConversationEntity[] = await this.wppConversationService.findInProgressByManagerId(this.manager.id);
            this.chathandler.fillRooms(entities);
            this.chathandler.sortRoomsByMostRecentMessages();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            this.chathandler.fillRooms([]);
        } finally {
            this.whatsappPercentLoading = 75;
        }
    }

    public async loadFinishedConversations(): Promise<void> {
        try {
            const entities: WhatsappConversationEntity[] = await this.wppConversationService.findFinishedByManagerId(this.manager.id);
            this.chathandler.fillRooms(entities);
            this.chathandler.sortRoomsByMostRecentMessages();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            this.chathandler.fillRooms([]);
        }
    }

    public async loadConversationByContact(contactId: string): Promise<void> {
        try {
            const entity: WhatsappConversationEntity = await this.wppConversationService.findByContactId(contactId);
            const newRoom: ChatRoom = this.chathandler.addRoom(entity, true);
            this.chathandler.setRoomAsMostRecent(newRoom);
            this.chathandler.updateNewConversationCount();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        }
    }

    public async loadUnstartedConversations(): Promise<void> {
        try {
            const entities: WhatsappConversationEntity[] = await this.wppConversationService.findUnstartedConversations();
            this.chathandler.fillRooms(entities);
            this.chathandler.sortRoomsByMostRecentMessages();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            this.chathandler.fillRooms([]);
        }
    }

    private filterUnreadConversations(): void {
        this.rooms = new Map(
            Array.from(this.rooms).filter((room: [string, ChatRoom]) => {
                return room[1].getUnreadThreads().length > 0;
            })
        );
    }

    private buildTemplateMessageRequestFrom(thread: ThreadMessage): WhatsappTemplateMessageRequest {
        return {
            id: thread.id,
            name: thread.templateName ?? '',
            wppManagerId: this.manager.id,
            wppContactId: this.roomSelected.contact.id,
            wppPhoneNumberId: this.manager.wppPhoneNumberId,
            parameters: WhatsappUtil.getMessageTemplateParams(thread.templateName ?? '', this.account, this.manager)
        };
    }

    private buildTextMessageRequestFrom(thread: ThreadMessage): WhatsappTextMessageRequest {
        return {
            id: thread.id,
            content: thread.content,
            wppManagerId: this.manager.id,
            wppContactId: this.roomSelected.contact.id,
            wppPhoneNumberId: this.manager.wppPhoneNumberId
        };
    }

    private setWhatsappActive(): void {
        this.isWhatsappActive =
            this.account.id !== null && this.account.active && this.account.scenario === WhatsappConstants.ACCOUNT_SCENARIO.INTEGRATED;
    }

    private setLoggedUser(): void {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.isAdmin = this.user.role !== AppConstants.ROLES.COMMON;
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
}
