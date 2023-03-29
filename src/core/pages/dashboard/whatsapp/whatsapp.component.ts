import { Component, OnDestroy, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { DateUtil, WebSocketConstants, WhatsappConstants } from '@ZoppyTech/utilities';
import { Subject } from 'rxjs';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappAccountPhoneNumberEntity } from 'src/shared/models/entities/whatsapp-account-phone-number.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappMessageEntity } from 'src/shared/models/entities/whatsapp-message.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WebSocketService } from 'src/shared/services/websocket/websocket.service';
import { WhatsappAccountManagerService } from 'src/shared/services/whatsapp-account-manager/whatsapp-account-manager.service';
import { WhatsappAccountPhoneNumberService } from 'src/shared/services/whatsapp-account-phone-number/whatsapp-account-phone-number.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { WhatsappContactService } from 'src/shared/services/whatsapp-contact/whatsapp-contact.service';
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

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit, OnDestroy {
    public openConversationMobile: boolean = false;
    public isWhatsappActive: boolean = false;
    public user: UserEntity = new UserEntity();
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
    public manager: ChatManager = new ChatManager();
    public account: ChatAccount = new ChatAccount();

    public constructor(
        public readonly wppAccountService: WhatsappAccountService,
        public readonly wppAccountManagerService: WhatsappAccountManagerService,
        //public readonly wppContactService: WhatsappContactService,
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

    public async onStartWhatsapp(): Promise<void> {
        console.log('Whatsapp loading...');
        await this.loadRegisteredWhatsappAccount();

        if (!this.isWhatsappActive) {
            this.whatsappLoading = false;
            return;
        }
        await this.loadBusinessAccounManager();
        await this.loadConversations();
        this.setWebSocket();
        this.whatsappLoading = false;
        //await this.setWhatsappLoading();
        console.log('Whatsapp initialized!');
    }

    public ngOnDestroy(): void {
        this.webSocketService.disconnect();
    }

    public getConversations(): Array<any> {
        return Array.from(this.conversations.entries());
    }

    public setWebSocket(): void {
        try {
            this.webSocketService
                .fromEvent<ChatSocketData>(WebSocketConstants.CHAT_EVENTS.RECEIVE)
                .subscribe((socketData: ChatSocketData) => {
                    let targetChatRoom: ChatRoom | undefined = undefined;
                    switch (socketData.action) {
                        case WebSocketConstants.CHAT_ACTIONS.CREATE:
                            targetChatRoom = this.conversations.get(socketData.message.wppContactId);
                            if (!targetChatRoom) return;
                            const messageIndex: number = WhatsappUtil.findLastIndexOfMessageSent(targetChatRoom.threads);
                            if (messageIndex < 0 || messageIndex >= targetChatRoom.threads.length) return;
                            targetChatRoom.threads.splice(messageIndex, 1);
                            targetChatRoom.threads.splice(messageIndex, 0, WhatsappMapper.mapMessage(socketData.message));
                            WhatsappMapper.setFirstMessagesOfDay(targetChatRoom.threads);
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.UPDATE:
                            targetChatRoom = this.conversations.get(socketData.message.wppContactId);
                            if (!targetChatRoom) return;
                            const messageFound: ThreadMessage | undefined = targetChatRoom?.threads.find(
                                (thread: ThreadMessage) => thread.id === socketData.message.id
                            );
                            if (messageFound) messageFound.status = socketData.message.status;
                            break;
                        case WebSocketConstants.CHAT_ACTIONS.RECEIVE:
                            targetChatRoom = this.conversations.get(socketData.message.wppContactId);
                            if (!targetChatRoom) return;
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
                    }
                });
        } catch (ex: any) {
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        }
    }

    public onSendingMessage(thread: ThreadMessage): void {
        const socketData: ChatSocketData = { action: 'create', message: new WhatsappMessageEntity() };
        socketData.message =
            thread.type === WhatsappConstants.MessageType.Template
                ? this.buildTemplateMessageFromThread(thread)
                : this.buildTextMessageFromThread(thread);
        this.chatRoomSelected.threads.push(WhatsappMapper.mapMessage(socketData.message));
        WhatsappMapper.setFirstMessagesOfDay(this.chatRoomSelected.threads);
        this.scrollDownEvent.next();
        this.webSocketService.emit(WebSocketConstants.CHAT_EVENTS.CREATE, socketData);
        this.setRoomAsMostRecent(this.chatRoomSelected);
    }

    public onContactSelected(contact: ChatContact): void {
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
    }

    public onConversationSelected(chatRoom: ChatRoom): void {
        if (this.chatRoomSelected) this.chatRoomSelected.actived = false;
        this.chatRoomSelected = chatRoom;
        this.chatRoomSelected.actived = true;
        this.scrollDownEvent.next();
        this.updateUnreadMessages();
        this.openConversationMobile = true;
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
            const entities: WhatsappMessageEntity[] = await this.wppMessageService.listByPhoneNumberId(this.manager.wppPhoneNumberId);
            this.conversations = WhatsappMapper.mapConversations(this.account, this.manager, entities);
            WhatsappMapper.setUnreadConversations(this.conversations);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.whatsappPercentLoading = 100;
        }
    }

    private buildTemplateMessageFromThread(thread: ThreadMessage): WhatsappMessageEntity {
        return {
            id: thread.id,
            type: WhatsappConstants.MessageType.Template,
            status: WhatsappConstants.MessageStatus.Sent,
            origin: WhatsappConstants.MessageOrigin.BusinessInitiated,
            content: thread.templateName ?? '',
            wppManagerId: this.chatRoomSelected.manager.id,
            wppContactId: this.chatRoomSelected.contact.id,
            wppPhoneNumberId: this.manager.wppPhoneNumberId,
            userId: this.user.id,
            parameters: WhatsappUtil.getMessageTemplateParams(thread.templateName ?? '', this.chatRoomSelected),
            createdAt: new Date(),
            updatedAt: new Date(),
            companyId: this.user.companyId
        };
    }

    private buildTextMessageFromThread(thread: ThreadMessage): WhatsappMessageEntity {
        return {
            id: thread.id,
            type: WhatsappConstants.MessageType.Text,
            status: WhatsappConstants.MessageStatus.Sent,
            origin: WhatsappConstants.MessageOrigin.BusinessInitiated,
            content: thread.content,
            wppManagerId: this.chatRoomSelected.manager.id,
            wppContactId: this.chatRoomSelected.contact.id,
            wppPhoneNumberId: this.manager.wppPhoneNumberId,
            userId: this.user.id,
            createdAt: new Date(),
            updatedAt: new Date(),
            companyId: this.user.companyId
        };
    }

    private setRoomAsMostRecent(chatRoom: ChatRoom): void {
        this.conversations.delete(chatRoom.contact.id);
        const sortByMostRecent: Array<[string, ChatRoom]> = Array.from(this.conversations.entries());
        sortByMostRecent.unshift([chatRoom.contact.id, chatRoom]);
        this.conversations = new Map(sortByMostRecent);
    }

    private setWhatsappActive(): void {
        this.isWhatsappActive =
            this.account.id !== null && this.account.active && this.account.scenario === WhatsappConstants.ACCOUNT_SCENARIO.INTEGRATED;
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

    // private async setWhatsappLoading(): Promise<void> {
    //     await DateUtil.delay(1000);
    //     this.whatsappLoading = false;
    // }
}
