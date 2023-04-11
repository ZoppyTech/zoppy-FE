import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants, DateUtil, WebSocketConstants, WhatsappConstants } from '@ZoppyTech/utilities';
import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
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
import { ChatAccount } from './models/chat-account';
import { ChatContact } from './models/chat-contact';
import { ChatManager } from './models/chat-manager';
import { ChatRoom } from './models/chat-room';
import { ChatSocketData } from './models/chat-socket-data';
import { Subcomponents } from './models/subcomponents';
import { ThreadMessage } from './models/thread-message';
import { WhatsappUtil } from './utils/whatsapp.util';
import { WhatsappMapper } from './whatsapp-mapper';
import { ChatFilters } from './models/chat-filters';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit, AfterViewInit, OnDestroy {
    public openConversationMobile: boolean = false;
    public isWhatsappActive: boolean = false;
    public user: UserEntity = new UserEntity();
    public isAdmin: boolean = false;
    public readonly subcomponents = Subcomponents;
    public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    public whatsappPercentLoading: number = 0;
    public whatsappLoading: boolean = true;
    public scrollDownEvent: Subject<void> = new Subject<void>();
    public declare contactSelected: ChatContact;
    public declare chatRoomSelected: ChatRoom;
    public declare chatList: Array<any>;
    public contacts: Array<ChatContact> = [];
    public conversations: Map<string, ChatRoom> = new Map();
    public finishedConversations: Map<string, ChatRoom> = new Map();
    public manager: ChatManager = new ChatManager();
    public account: ChatAccount = new ChatAccount();
    public queueCount: number = 0;

    public filterLoading: boolean = false;
    public pullLoading: boolean = false;
    public isChatRoomVisible$ = new BehaviorSubject(false);

    /** NEW VARS */
    public latestMessages: Array<[string, ChatRoom]> = [];

    public constructor(
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
    ) {}

    public async ngOnInit(): Promise<void> {
        this.setLoggedUser();
        this.setBreadcrumb();
        this.onStartWhatsapp();
    }

    public ngAfterViewInit(): void {
        this.setWebSocket();
    }

    public async onStartWhatsapp(): Promise<void> {
        console.log('Whatsapp loading...');
        await this.loadRegisteredWhatsappAccount();
        if (!this.isWhatsappActive) {
            this.whatsappLoading = false;
            return;
        }
        await this.loadBusinessAccounManager();
        await this.loadConversations();
        await this.countUnstarted();
        this.whatsappLoading = false;
        console.log('Whatsapp initialized!');
    }

    public ngOnDestroy(): void {
        this.webSocketService.disconnect();
    }

    public destroyAndReload() {
        this.isChatRoomVisible$.next(false);
        setTimeout(() => {
            this.isChatRoomVisible$.next(true);
        }, 1);
    }

    public getConversations(): Array<[string, ChatRoom]> {
        return Array.from(this.conversations.entries());
    }

    public updateConversations(conversations: Array<[string, ChatRoom]> = []): void {
        if (conversations.length <= 0) {
            this.latestMessages = conversations;
            return;
        }
        this.latestMessages = conversations.sort((a: [string, ChatRoom], b: [string, ChatRoom]) => {
            const leftDate: Date = new Date(a[1].threads[a[1].threads.length - 1].createdAt);
            const rightDate: Date = new Date(b[1].threads[b[1].threads.length - 1].createdAt);
            if (leftDate.getTime() - rightDate.getTime() === 0) return 0;
            else if (leftDate.getTime() - rightDate.getTime() > 0) return -1;
            else return 1;
        });
    }

    public setWebSocket(): void {
        try {
            this.webSocketService
                .fromEvent<ChatSocketData>(WebSocketConstants.CHAT_EVENTS.RECEIVE)
                .subscribe((socketData: ChatSocketData) => {
                    this.updateConversations(this.getConversations());
                    let targetChatRoom: ChatRoom | undefined = undefined;
                    switch (socketData.action) {
                        case WebSocketConstants.CHAT_ACTIONS.NEW_CONVERSATION_COUNT:
                            if (socketData.message.companyId !== this.account.companyId) return;
                            this.queueCount = socketData.queueCount ?? 0;
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.CREATE:
                            if (socketData.message.companyId !== this.account.companyId) return;
                            targetChatRoom = this.conversations.get(socketData.message.wppContactId);
                            if (!targetChatRoom) return;
                            const messageIndex: number = WhatsappUtil.findLastIndexOfMessageSent(targetChatRoom.threads);
                            if (messageIndex < 0 || messageIndex >= targetChatRoom.threads.length) return;
                            targetChatRoom.threads.splice(messageIndex, 1);
                            targetChatRoom.threads.splice(messageIndex, 0, WhatsappMapper.mapMessage(socketData.message));
                            WhatsappMapper.setFirstMessagesOfDay(targetChatRoom.threads);
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.UPDATE:
                            if (socketData.message.companyId !== this.account.companyId) return;
                            targetChatRoom = this.conversations.get(socketData.message.wppContactId);
                            if (!targetChatRoom) return;
                            const messageFound: ThreadMessage | undefined = targetChatRoom?.threads.find(
                                (thread: ThreadMessage) => thread.id === socketData.message.id
                            );
                            if (!messageFound) return;
                            messageFound.status = socketData.message.status;
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.RECEIVE:
                            if (socketData.message.companyId !== this.account.companyId) return;
                            this.updateNewConversationCount();
                            targetChatRoom = this.conversations.get(socketData.message.wppContactId);
                            if (!targetChatRoom && !this.isAdmin) return;
                            if (!targetChatRoom) {
                                this.loadConversationByContact(socketData.message.wppContactId);
                                return;
                            }
                            const receivedMessage: ThreadMessage = WhatsappMapper.mapMessage(socketData.message);
                            if (targetChatRoom.contact.id === this.chatRoomSelected?.contact.id) {
                                this.chatRoomSelected.unreadThreads.push(receivedMessage);
                                this.updateUnreadMessages();
                            } else {
                                targetChatRoom.unreadThreads.push(receivedMessage);
                            }
                            this.setRoomAsMostRecent(targetChatRoom);
                            targetChatRoom.threads.push(receivedMessage);
                            WhatsappMapper.setFirstMessagesOfDay(targetChatRoom.threads);
                            this.scrollDownEvent.next();
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.CHAT_TRANSFER:
                            if (socketData.message.companyId !== this.account.companyId) return;
                            if (socketData.message.wppManagerId !== this.manager.id) return;
                            this.loadConversationByContact(socketData.message.wppContactId);
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.UPDATE_CURRENT_CHAT_ROOM:
                            if (socketData.message.companyId !== this.account.companyId) return;
                            if (socketData.message.wppContactId !== this.chatRoomSelected.contact.id) return;
                            this.destroyAndReload();
                            break;
                    }
                });
        } catch (ex: any) {
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        }
    }

    public async onSendingMessage(thread: ThreadMessage): Promise<void> {
        try {
            this.chatRoomSelected.threads.push(thread);
            WhatsappMapper.setFirstMessagesOfDay(this.chatRoomSelected.threads);
            this.scrollDownEvent.next();
            this.setRoomAsMostRecent(this.chatRoomSelected);

            if (thread.type === WhatsappConstants.MessageType.Template) {
                const request: WhatsappTemplateMessageRequest = this.buildTemplateMessageRequestFrom(thread);
                await this.wppMessageService.createTemplateMessage(request);
                return;
            }
            const request: WhatsappTextMessageRequest = this.buildTextMessageRequestFrom(thread);
            await this.wppMessageService.createTextMessage(request);
        } catch (ex: any) {
            const threadIndex: number = this.chatRoomSelected.threads.findIndex(
                (threadValue: ThreadMessage) => threadValue.id === thread.id
            );
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            if (threadIndex === -1) return;
            this.chatRoomSelected.threads.splice(threadIndex, 1);
        }
    }

    public onContactSelected(contact: ChatContact): void {
        if (this.chatRoomSelected && this.chatRoomSelected.contact.id === contact.id) return;
        this.contactSelected = contact;
        if (!this.conversations.has(this.contactSelected.id)) {
            const newChatRoom: ChatRoom = new ChatRoom();
            newChatRoom.contact = this.contactSelected;
            newChatRoom.manager = this.manager;
            newChatRoom.threads = [];
            this.setRoomAsMostRecent(newChatRoom);
        }
        if (this.chatRoomSelected) this.chatRoomSelected.actived = false;
        this.chatRoomSelected = this.conversations.get(this.contactSelected.id) ?? new ChatRoom();
        this.chatRoomSelected.actived = true;
        this.scrollDownEvent.next();
        this.openConversationMobile = true;
        this.destroyAndReload();
    }

    public onConversationSelected(chatRoom: ChatRoom): void {
        if (this.chatRoomSelected && this.chatRoomSelected.contact.id === chatRoom.contact.id) return;
        if (this.chatRoomSelected) this.chatRoomSelected.actived = false;
        this.chatRoomSelected = chatRoom;
        this.chatRoomSelected.actived = true;
        this.scrollDownEvent.next();
        this.updateUnreadMessages();
        this.openConversationMobile = true;
        this.destroyAndReload();
    }

    public onFinishChatRoom(chatRoom: ChatRoom): void {
        this.conversations.delete(chatRoom.contact.id);
        this.chatRoomSelected = new ChatRoom();
        this.isChatRoomVisible$ = new BehaviorSubject(false);
        this.updateConversations(this.getConversations());
        this.toast.success('Conversa finalizada!', WhatsappConstants.ToastTitles.Success);
    }

    public updateUnreadMessages(): void {
        const unreadMessages: ThreadMessage[] = this.chatRoomSelected.unreadThreads;
        for (const unreadMessage of unreadMessages) {
            unreadMessage.readByManager = true;
            const socketData: ChatSocketData = { action: 'update', message: new WhatsappMessageEntity() };
            socketData.message.id = unreadMessage.id;
            socketData.message.userId = this.user.id;
            this.webSocketService.emit(WebSocketConstants.CHAT_EVENTS.UPDATE, socketData);
        }
        this.chatRoomSelected.unreadThreads.splice(0, unreadMessages.length);
    }

    public updateNewConversationCount(): void {
        const socketData: ChatSocketData = {
            action: 'new_conversation_count',
            message: { companyId: this.account.companyId } as WhatsappMessageEntity
        };
        this.webSocketService.emit('update_new_conversation_count', socketData);
    }

    public async onPullNewConversationButtonClicked(): Promise<void> {
        try {
            if (this.pullLoading) return;
            this.pullLoading = true;
            const entity: WhatsappConversationEntity = await this.wppConversationService.pull();
            this.updateNewConversationCount();
            const newConversation: [string, ChatRoom] = WhatsappMapper.mapConversation(this.account, this.manager, entity.messages);
            this.setRoomAsMostRecent(newConversation[1]);
            this.onConversationSelected(newConversation[1]);
            this.updateConversations(this.getConversations());
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
                this.filterUnreadConversations();
                break;
            case ChatFilters.Finished:
                await this.loadFinishedConversations();
                break;
            case ChatFilters.InProgress:
            default:
                await this.loadConversations();
                break;
        }
        this.filterLoading = false;
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
                accountId: entity.wppAccountId
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
            const entities: WhatsappMessageEntity[] = await this.wppMessageService.listByManagerId(this.manager.id);
            this.conversations = WhatsappMapper.mapConversations(this.account, this.manager, entities);
            WhatsappMapper.setUnreadConversations(this.conversations);
            this.updateConversations(this.getConversations());
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            this.conversations = new Map();
        } finally {
            this.whatsappPercentLoading = 75;
        }
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

    public async loadFinishedConversations(): Promise<void> {
        try {
            const entities: WhatsappMessageEntity[] = await this.wppMessageService.listFinishedByManagerId(this.manager.id);
            this.finishedConversations = WhatsappMapper.mapConversations(this.account, this.manager, entities);
            WhatsappMapper.setUnreadConversations(this.finishedConversations);
            this.updateConversations(Array.from(this.finishedConversations));
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
            this.conversations = new Map();
        }
    }

    public async loadConversationByContact(contactId: string): Promise<void> {
        try {
            const entities: WhatsappMessageEntity[] = await this.wppMessageService.listByContactId(contactId);
            const newConversation: [string, ChatRoom] = WhatsappMapper.mapConversation(this.account, this.manager, entities);
            this.conversations.set(contactId, newConversation[1]);
            WhatsappMapper.setUnreadConversations(this.conversations);
            this.setRoomAsMostRecent(newConversation[1]);
            this.updateConversations(this.getConversations());
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        }
    }

    private filterUnreadConversations(): void {
        this.conversations = new Map(
            Array.from(this.conversations).filter((conversation: [string, ChatRoom]) => {
                return conversation[1].unreadThreads.length > 0;
            })
        );
        this.updateConversations(this.getConversations());
    }

    private setRoomAsMostRecent(chatRoom: ChatRoom): void {
        this.conversations.delete(chatRoom.contact.id);
        const sortByMostRecent: Array<[string, ChatRoom]> = Array.from(this.conversations.entries());
        sortByMostRecent.unshift([chatRoom.contact.id, chatRoom]);
        this.conversations = new Map(sortByMostRecent);
        this.updateConversations(this.getConversations());
    }

    private buildTemplateMessageRequestFrom(thread: ThreadMessage): WhatsappTemplateMessageRequest {
        return {
            id: thread.id,
            name: thread.templateName ?? '',
            wppManagerId: this.chatRoomSelected.manager.id,
            wppContactId: this.chatRoomSelected.contact.id,
            wppPhoneNumberId: this.manager.wppPhoneNumberId,
            parameters: WhatsappUtil.getMessageTemplateParams(thread.templateName ?? '', this.chatRoomSelected)
        };
    }

    private buildTextMessageRequestFrom(thread: ThreadMessage): WhatsappTextMessageRequest {
        return {
            id: thread.id,
            content: thread.content,
            wppManagerId: this.chatRoomSelected.manager.id,
            wppContactId: this.chatRoomSelected.contact.id,
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
