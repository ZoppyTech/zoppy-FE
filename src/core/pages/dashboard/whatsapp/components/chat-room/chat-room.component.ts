import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { StringUtil, WhatsappConstants } from '@ZoppyTech/utilities';
import { Observable, Subscription } from 'rxjs';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMessageTemplateEntity } from 'src/shared/models/entities/whatsapp-message-template.entity';
import { WhatsappConversationRequest } from 'src/shared/models/requests/whatsapp-conversation/whatsapp-conversation.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappConversationService } from 'src/shared/services/whatsapp-conversation/whatsapp-conversation.service';
import { WhatsappMediaService } from 'src/shared/services/whatsapp-media/whatsapp-media.service';
import { ChatRoom } from '../../models/chat-room';
import { ThreadMessage } from '../../models/thread-message';
import { WhatsappUtil } from '../../utils/whatsapp.util';
import { ChatUtility } from './helpers/chat-utility';
import { ChatMessageTemplate } from './models/chat-message-template';
import { MessageTemplateService } from 'src/shared/services/message-template/message-template.service';
import { MessageTemplateGroupEntity } from 'src/shared/models/entities/message-template-group.entity';
import { ChatMapper } from '../../helpers/chat-mapper';
import { ChatHandler } from '../../helpers/chat-handler';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public declare chathandler: ChatHandler;
    @Input() public room: ChatRoom = new ChatRoom();
    @Output() public roomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();
    @Output() public sendMessageEvent: EventEmitter<ThreadMessage> = new EventEmitter<ThreadMessage>();
    @Output() public goBackToChatList: EventEmitter<void> = new EventEmitter<void>();
    @Output() public finishRoom: EventEmitter<string> = new EventEmitter<string>();
    @Input() public events: Observable<void> = new Observable();

    @ViewChild('inputFileImage') public inputFileImage: any;
    @ViewChild('inputFileDocument') public inputFileDocument: any;

    private eventsSubscription: Subscription = new Subscription();
    public latestConversation: WhatsappConversationEntity = new WhatsappConversationEntity();
    public messageTemplates: Array<ChatMessageTemplate> = [];
    public messageTemplateSelected: ChatMessageTemplate | null = null;

    public declare uploadFileInput: UploadFileInput;

    public scrollerElement: HTMLElement | null = null;
    public scrollerHandler: any = null;

    public messageInput: string = '';
    public readonly panelScrollableElementId: string = 'panel-scrollable';
    public readonly UNSUPPORTED_MESSAGE_TYPE: string = 'Mensagem não suportada.';
    public readonly UNSUPPORTED_FILE_TYPE: string = 'Tipo de arquivo para upload não suportado';

    public isHovered: boolean = false;
    public isLastMessage: boolean = false;
    public messagesLoading: boolean = false;
    public messageTemplatesLoading: boolean = false;
    public finishConversationLoading: boolean = false;
    public countdownTimerVisible: boolean = false;
    public rightPanelVisible: boolean = false;

    public footerOptions: Map<string, boolean> = new Map([
        ['attachFileOption', false],
        ['messageTemplateOption', false]
    ]);

    public constructor(
        public readonly chatMapper: ChatMapper,
        public readonly wppConversationService: WhatsappConversationService,
        public readonly messageTemplateService: MessageTemplateService,
        public readonly wppMediaService: WhatsappMediaService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly chatUtility: ChatUtility
    ) {}

    public async ngOnInit(): Promise<void> {
        this.eventsSubscription = this.events.subscribe(() => this.seeLastMessage());
        await this.loadLatestConversation();
        await this.loadMessageTemplates();
    }

    public selectFooterOptions(optionName: string, value: boolean): void {
        if (!this.latestConversation.sessionExpiration && optionName === 'attachFileOption') {
            return;
        }
        this.footerOptions.set('attachFileOption', false);
        this.footerOptions.set('messageTemplateOption', false);
        this.footerOptions.set(optionName, value);
    }

    public ngAfterViewInit(): void {
        this.addWheelEventListener();
    }

    public ngOnDestroy(): void {
        this.eventsSubscription.unsubscribe();
        this.removeWheelEventListener();
    }

    public async loadLatestConversation(): Promise<void> {
        try {
            this.countdownTimerVisible = false;
            this.messagesLoading = this.room.reloadEnabled;
            this.seeLastMessage();
            this.latestConversation = await this.wppConversationService.findByContactId(this.room.contact.id);
            this.latestConversation = this.validateSessionExpiration(this.latestConversation);
            if (this.room.reloadEnabled) {
                const newRoom: ChatRoom = this.chathandler.addRoom(this.latestConversation, false);
                this.chathandler.setRoomAsMostRecent(newRoom);
                newRoom.actived = true;
                this.room = newRoom;
                this.roomChange.emit(this.room);
                this.seeLastMessage();
            }
        } catch (error: any) {
            this.latestConversation = new WhatsappConversationEntity();
        } finally {
            this.messagesLoading = false;
            this.countdownTimerVisible = true;
        }
    }

    public handleFileUpload(event: any, fileType: string): void {
        const file: any = event.target.files[0];
        this.uploadFileInput = {
            fileName: file.name,
            type: fileType,
            input: event,
            data: file
        };

        switch (fileType) {
            case 'image':
                this.openUploadImageModal(this.uploadFileInput);
                break;
            case 'document':
                this.openUploadDocumentModal(this.uploadFileInput);
                break;
            default:
                this.toast.error(this.UNSUPPORTED_FILE_TYPE, WhatsappConstants.ToastTitles.Error);
        }
    }

    public chooseImageFile(): void {
        this.inputFileImage.nativeElement.click();
    }

    public chooseDocumentFile(): void {
        this.inputFileDocument.nativeElement.click();
    }

    public openUploadImageModal(input: UploadFileInput) {
        this.modal.open(
            Modal.IDENTIFIER.UPLOAD_IMAGE_MEDIA_PREVIEW_MODAL,
            {
                fileName: input.fileName,
                fileData: input.data,
                contactId: this.room.contact.id,
                contactName: this.room.contact.firstName
            },
            (newMessage: any) => {
                const thread: ThreadMessage = this.chatMapper.mapMessage(newMessage);
                this.room.addThread(thread);
                this.room.setFirstMessagesOfDay();
                this.seeLastMessage();
            }
        );
    }

    public openUploadDocumentModal(input: UploadFileInput) {
        this.modal.open(
            Modal.IDENTIFIER.UPLOAD_DOCUMENT_MEDIA_PREVIEW_MODAL,
            {
                fileName: input.fileName,
                fileData: input.data,
                contactId: this.room.contact.id,
                contactName: this.room.contact.firstName
            },
            (newMessage: any) => {
                const thread: ThreadMessage = this.chatMapper.mapMessage(newMessage);
                this.room.addThread(thread);
                this.room.setFirstMessagesOfDay();
                this.seeLastMessage();
            }
        );
    }

    public editContactModal(): void {
        this.modal.open(
            Modal.IDENTIFIER.CHAT_CONTACT,
            {
                id: this.room.contact.id,
                firstName: this.room.contact.firstName,
                lastName: this.room.contact.lastName,
                phone: WhatsappUtil.removeCountryCode(this.room.contact.displayPhone),
                isBlocked: this.room.contact.isBlocked
            },
            (updatedContact: any) => {
                this.room.contact = this.chatMapper.mapContact(updatedContact);
            }
        );
    }

    public async loadMessageTemplates(): Promise<void> {
        try {
            this.messageTemplatesLoading = true;
            const entities: MessageTemplateGroupEntity[] = await this.messageTemplateService.listGroups(
                WhatsappConstants.MESSAGE_TEMPLATES_VISIBILITY.USER
            );
            this.messageTemplates = entities.map((entity: MessageTemplateGroupEntity) => {
                return {
                    groupId: entity.id,
                    whatsappMessageTemplateId: entity.whatsappMessageTemplate?.id,
                    wppId: entity.whatsappMessageTemplate?.wppId,
                    name: entity.whatsappMessageTemplate?.wppName,
                    title: entity.name,
                    description: entity.description,
                    content: entity.messageTemplates[0]?.text,
                    status: entity.whatsappMessageTemplate?.status,
                    headerText: entity.whatsappMessageTemplate?.headerMessage,
                    footerText: entity.whatsappMessageTemplate?.footerMessage,
                    ctaLabel: entity.whatsappMessageTemplate?.ctaLabel,
                    ctaLink: entity.whatsappMessageTemplate?.ctaLink,
                    isSuggested: false,
                    createdAt: entity.createdAt
                };
            });
            this.replaceMessageTemplatesVariables();
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
        this.selectFooterOptions('messageTemplateOption', !this.footerOptions.get('messageTemplateOption'));
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

    public async transferConversation(): Promise<void> {
        this.modal.open(
            Modal.IDENTIFIER.CHAT_CONVERSATION_TRANSFER_MODAL,
            {
                id: this.room.id,
                ticket: this.room.ticket,
                wppContactId: this.room.contact.id,
                wppManagerId: this.chathandler.rootManager.id,
                wppAccountId: this.chathandler.account.id
            },
            (conversation: WhatsappConversationEntity) => {
                if (!this.chathandler.isAdmin) this.finishRoom.emit(this.room.contact.id);
                this.room.manager = this.chatMapper.mapManager(conversation.manager);
                this.chathandler.updateChatTransfer(this.room);
                this.toast.success('Conversa transferida com sucesso!', WhatsappConstants.ToastTitles.Success);
            }
        );
    }

    public async finishConversation(): Promise<void> {
        try {
            if (this.finishConversationLoading) return;
            this.finishConversationLoading = true;
            const request: WhatsappConversationRequest = {
                ticket: this.room.ticket,
                wppContactId: this.room.contact.id,
                wppManagerId: this.chathandler.rootManager.id
            };
            await this.wppConversationService.finish(this.room.id, request);
            this.chathandler.updateNewConversationCount();
            this.chathandler.updateFinishedConversation(this.room.contact.id);
            this.finishRoom.emit(this.room.contact.id);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.finishConversationLoading = false;
        }
    }

    public getInputTextPlaceholder(): string {
        if (this.room.contact.isBlocked) {
            return 'Este contato está bloqueado.';
        } else if (!this.latestConversation.sessionExpiration) {
            return "Por favor, clique no ícone '#' e selecione uma nova mensagem.";
        }
        return 'Escreva sua mensagem';
    }

    private validateSessionExpiration(entity: WhatsappConversationEntity): WhatsappConversationEntity {
        if (!entity.sessionExpiration) return entity;
        if (new Date(Number.parseInt(entity.sessionExpiration)).getTime() > new Date().getTime()) return entity;
        entity.sessionExpiration = null;
        return entity;
    }

    private buildTemplateMessage(): ThreadMessage {
        return {
            id: StringUtil.generateUuid(),
            type: WhatsappConstants.MessageType.Template,
            templateName: this.messageTemplateSelected?.name,
            content: this.messageTemplateSelected?.content ?? '',
            headerText: this.messageTemplateSelected?.headerText ?? '',
            footerText: this.messageTemplateSelected?.footerText ?? '',
            ctaLabel: this.messageTemplateSelected?.ctaLabel ?? '',
            ctaLink: this.messageTemplateSelected?.ctaLink ?? '',
            senderName: this.room?.manager?.name ?? '',
            readByManager: true,
            status: WhatsappConstants.MESSAGE_STATUS.FORWARDED,
            isBusiness: true,
            isFirstMessageOfDay: false,
            createdAt: new Date(),
            companyId: this.room.companyId
        };
    }

    private buildTextMessage(): ThreadMessage {
        return {
            id: StringUtil.generateUuid(),
            type: WhatsappConstants.MessageType.Text,
            content: this.messageInput,
            senderName: this.room?.manager?.name ?? '',
            headerText: '',
            footerText: '',
            ctaLabel: '',
            ctaLink: '',
            status: WhatsappConstants.MESSAGE_STATUS.FORWARDED,
            readByManager: true,
            isBusiness: true,
            isFirstMessageOfDay: false,
            createdAt: new Date(),
            companyId: this.room.companyId
        };
    }

    private replaceMessageTemplatesVariables(): void {
        this.messageTemplates = this.messageTemplates.map((messageTemplate: ChatMessageTemplate) => {
            return {
                ...messageTemplate,
                content: WhatsappUtil.replaceVariablesFromTemplateMessage(
                    messageTemplate.content,
                    WhatsappUtil.getMessageTemplateParams(
                        messageTemplate.name,
                        this.chathandler.account,
                        this.chathandler.rootManager,
                        this.room.contact
                    )
                )
            };
        });
    }

    @HostListener('document:keydown.enter', ['$event']) public onKeydownHandler(event: KeyboardEvent) {
        if (!this.messageInput || this.messageInput === '') return;
        this.sendMessage();
    }
}

export interface UploadFileInput {
    type: string;
    fileName: string;
    data: any;
    input: any;
}
