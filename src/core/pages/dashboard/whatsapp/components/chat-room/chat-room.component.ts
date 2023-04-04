import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappConstants } from '@ZoppyTech/utilities';
import { Observable, Subscription } from 'rxjs';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappMessageTemplateEntity } from 'src/shared/models/entities/whatsapp-message-template.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappBusinessManagementService } from 'src/shared/services/whatsapp-business-management/whatsapp-business-management.service';
import { WhatsappConversationService } from 'src/shared/services/whatsapp-conversation/whatsapp-conversation.service';
import { WhatsappMediaService } from 'src/shared/services/whatsapp-media/whatsapp-media.service';
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

    @ViewChild('inputFileImage') public inputFileImage: any;
    @ViewChild('inputFileDocument') public inputFileDocument: any;

    public latestConversation: WhatsappConversationEntity = new WhatsappConversationEntity();
    public messageTemplates: Array<ChatMessageTemplate> = [];
    public messageTemplatesReplaced: Array<ChatMessageTemplate> = [];
    public messageTemplateSelected: ChatMessageTemplate | null = null;

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

    public footerOptions: Map<string, boolean> = new Map([
        ['attachFileOption', false],
        ['messageTemplateOption', false]
    ]);

    public declare uploadFileInput: UploadFileInput;

    public constructor(
        public readonly wppConversationService: WhatsappConversationService,
        public readonly wppBusinessManagementService: WhatsappBusinessManagementService,
        public readonly wppMediaService: WhatsappMediaService,
        public readonly toast: ToastService,
        public readonly confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly chatUtility: ChatUtility
    ) {}

    public async ngOnInit(): Promise<void> {
        this.eventsSubscription = this.events.subscribe(() => this.seeLastMessage());
        this.seeLastMessage();
        await this.loadLatestConversation();
        await this.loadMessageTemplates();
        console.log('Chat Room initialized!');
    }

    public selectFooterOptions(optionName: string, value: boolean): void {
        this.footerOptions.set('attachFileOption', false);
        this.footerOptions.set('messageTemplateOption', false);
        this.footerOptions.set(optionName, value);
    }

    public ngAfterViewInit(): void {
        this.addWheelEventListener();
    }

    public ngOnDestroy(): void {
        //this.clearUnreadMessages();
        this.eventsSubscription.unsubscribe();
        this.removeWheelEventListener();
    }

    public async loadLatestConversation(): Promise<void> {
        try {
            this.latestConversation = await this.wppConversationService.findByContactId(this.chatRoom.contact.id);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
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
                contactId: this.chatRoom.contact.id,
                contactName: this.chatRoom.contact.firstName
            },
            (newMessage: any) => {
                this.chatRoom.threads.push(WhatsappMapper.mapMessage(newMessage));
                WhatsappMapper.setFirstMessagesOfDay(this.chatRoom.threads);
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
                contactId: this.chatRoom.contact.id,
                contactName: this.chatRoom.contact.firstName
            },
            (newMessage: any) => {
                this.chatRoom.threads.push(WhatsappMapper.mapMessage(newMessage));
                WhatsappMapper.setFirstMessagesOfDay(this.chatRoom.threads);
                this.seeLastMessage();
            }
        );
    }

    public async loadMessageTemplates(): Promise<void> {
        try {
            this.messageTemplatesLoading = true;
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

    public editContactModal(): void {
        this.modal.open(
            Modal.IDENTIFIER.CHAT_CONTACT,
            {
                id: this.chatRoom.contact.id,
                firstName: this.chatRoom.contact.firstName,
                lastName: this.chatRoom.contact.lastName,
                phone: WhatsappUtil.removeCountryCode(this.chatRoom.contact.displayPhone),
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
            createdAt: new Date(),
            companyId: this.chatRoom.account.companyId
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
            createdAt: new Date(),
            companyId: this.chatRoom.account.companyId
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

export interface UploadFileInput {
    type: string;
    fileName: string;
    data: any;
    input: any;
}
