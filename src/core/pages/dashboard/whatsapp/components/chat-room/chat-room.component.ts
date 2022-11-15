import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Observable, Subscription } from 'rxjs';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { WhatsappMessageTemplateEntity } from 'src/shared/models/entities/whatsapp-message-template.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappBusinessManagementService } from 'src/shared/services/whatsapp-business-management/whatsapp-business-management.service';
import { ChatRoom } from '../../models/chat-room';
import { ThreadMessage } from '../../models/thread-message';
import { WhatsappUtil } from '../../utils/whatsapp.util';
import { WhatsappMapper } from '../../whatsapp-mapper';
import { ChatUtility } from './helpers/chat-utility';
import { ChatMessageTemplate } from './models/chat-message-template';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy {
    private eventsSubscription: Subscription = new Subscription();
    @Input() public chatRoom: ChatRoom = new ChatRoom();
    @Output() public chatRoomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();
    @Output() public sendMessageEvent: EventEmitter<ThreadMessage> = new EventEmitter<ThreadMessage>();
    @Output() public goBackToChatList: EventEmitter<void> = new EventEmitter<void>();
    @Input() public events: Observable<void> = new Observable();

    public isHovered: boolean = false;
    public messageTemplateListVisible: boolean = false;
    public messageTemplates: Array<ChatMessageTemplate> = [];
    public messageTemplatesReplaced: Array<ChatMessageTemplate> = [];
    public messageTemplatesLoading: boolean = true;
    public messageTemplateSelected: ChatMessageTemplate | null = null;
    public messagesLoading: boolean = false;
    public isLastMessage: boolean = false;
    public messageInput: string = '';
    public scrollerElement: HTMLElement | null = null;
    public scrollerHandler: any = null;
    public readonly panelScrollableElementId: string = 'panel-scrollable';

    public constructor(
        public readonly wppBusinessManagementService: WhatsappBusinessManagementService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly chatUtility: ChatUtility
    ) {}

    public async ngOnInit(): Promise<void> {
        this.eventsSubscription = this.events.subscribe(() => this.seeLastMessage());
        this.seeLastMessage();
        await this.loadMessageTemplates();
        console.log('Chat Room initialized!');
    }

    public ngAfterViewInit(): void {
        this.addWheelEventListener();
    }

    public ngOnDestroy(): void {
        //this.clearUnreadMessages();
        this.eventsSubscription.unsubscribe();
        this.removeWheelEventListener();
    }

    public async loadMessageTemplates(): Promise<void> {
        try {
            this.messageTemplatesLoading = true;
            console.log('Loading Template messages!');
            const entities: WhatsappMessageTemplateEntity[] = await this.wppBusinessManagementService.list(
                WhatsappConstants.MESSAGE_TEMPLATES_VISIBILITY.USER
            );
            this.messageTemplates = entities.map((entity: WhatsappMessageTemplateEntity) => {
                return {
                    ...entity,
                    isSuggested: false
                };
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.messageTemplatesLoading = false;
        }
    }

    public addWheelEventListener(): void {
        this.scrollerElement = document.getElementById(this.panelScrollableElementId);
        this.scrollerHandler = this.onWheelEventListener.bind(this);
        this.scrollerElement?.addEventListener('wheel', this.scrollerHandler, false);
    }

    public onWheelEventListener(event: WheelEvent): void {
        const scrolls: number = Math.abs(event.deltaY * 3);
        if (!this.scrollerElement) return;
        this.isLastMessage = !(
            this.scrollerElement?.scrollHeight - this.scrollerElement?.scrollTop >=
            this.scrollerElement?.offsetHeight + scrolls
        );
    }

    public removeWheelEventListener(): void {
        this.scrollerElement?.removeEventListener('wheel', this.scrollerHandler, false);
    }

    public sendMessage(): void {
        if (this.messageTemplateSelected) {
            this.sendMessageEvent.emit(this.buildTemplateMessage());
            this.clearMessageInput();
            return;
        }
        if (!this.messageInput.trim()) return;
        this.sendMessageEvent.emit(this.buildTextMessage());
        this.clearMessageInput();
    }

    public selectMessageTemplate(messageTemplate: ChatMessageTemplate): void {
        this.messageTemplateSelected = messageTemplate;
        this.messageInput = messageTemplate.content;
        this.toggleMessageTemplatesVisibility();
    }

    public toggleMessageTemplatesVisibility(): void {
        this.replaceMessageTemplatesVariables();
        this.messageTemplateListVisible = !this.messageTemplateListVisible;
    }

    public seeLastMessage(): void {
        setTimeout(() => {
            this.isLastMessage = true;
            this.chatUtility.scrollToBottom(this.panelScrollableElementId);
        });
    }

    public clearMessageInput(): void {
        this.messageTemplateSelected = null;
        this.messageInput = '';
    }

    public editContactModal(): void {
        this.modal.open(
            Modal.IDENTIFIER.CHAT_CONTACT,
            {
                id: this.chatRoom.contact.id,
                firstName: this.chatRoom.contact.firstName,
                lastName: this.chatRoom.contact.lastName,
                phoneNumber: WhatsappUtil.removeCountryCode(this.chatRoom.contact.displayPhone),
                isBlocked: this.chatRoom.contact.isBlocked
            },
            (updatedContact: any) => {
                this.chatRoom.contact = WhatsappMapper.mapContact(updatedContact);
            }
        );
    }

    public getInputTextPlaceholder(): string {
        return !this.chatRoom.contact.isBlocked ? 'Escreva sua mensagem' : 'Este contato está bloqueado.';
    }

    private buildTemplateMessage(): ThreadMessage {
        return {
            type: WhatsappConstants.MessageType.Template,
            templateName: this.messageTemplateSelected?.name,
            content: this.messageTemplateSelected?.content ?? '',
            readByManager: true,
            status: WhatsappConstants.MessageStatus.Sent,
            isBusiness: true,
            isFirstMessageOfDay: false,
            createdAt: new Date()
        };
    }

    private buildTextMessage(): ThreadMessage {
        return {
            type: WhatsappConstants.MessageType.Text,
            content: this.messageInput,
            status: WhatsappConstants.MessageStatus.Sent,
            readByManager: true,
            isBusiness: true,
            isFirstMessageOfDay: false,
            createdAt: new Date()
        };
    }

    private replaceMessageTemplatesVariables(): void {
        this.messageTemplatesReplaced = this.messageTemplates.map((messageTemplate: ChatMessageTemplate) => {
            return {
                ...messageTemplate,
                content: WhatsappUtil.replaceVariablesFromTemplateMessage(
                    messageTemplate.content,
                    WhatsappUtil.getMessageTemplateParams(messageTemplate.name, this.chatRoom)
                )
            };
        });
    }

    @HostListener('document:keydown.enter', ['$event']) public onKeydownHandler(event: KeyboardEvent) {
        if (!this.messageInput || this.messageInput === '') return;
        this.sendMessage();
    }
}
