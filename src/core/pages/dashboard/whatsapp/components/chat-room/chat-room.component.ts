import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ChatRoom, WhatsappMessageStatus, WhatsappMessageType } from '../../whatsapp.component';
import { ChatUtility } from './helpers/chat-utility';

@Component({
    selector: 'chat-room',
    templateUrl: './chat-room.component.html',
    styleUrls: ['./chat-room.component.scss']
})
export class ChatRoomComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input() public chatRoom: ChatRoom = new ChatRoom();
    @Output() public chatRoomChange: EventEmitter<ChatRoom> = new EventEmitter<ChatRoom>();

    public loadingMessages: boolean = false;
    public newMessage: any;
    public isLastMessage: boolean = false;

    private scrollerElement: HTMLElement | null = null;
    private scrollerHandler: any = null;

    public readonly panelScrollableElementId: string = 'panel-scrollable';

    public constructor(private chatUtility: ChatUtility) {}

    public ngOnInit(): void {
        console.log('init');
        this.chatRoom.threads = [
            {
                id: '1',
                type: WhatsappMessageType.Template,
                message:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                status: WhatsappMessageStatus.Sent,
                isBusiness: true,
                isFirstMessageOfDay: true,
                createdAt: new Date('2022-09-13T08:46:24.000Z'),
                updatedAt: new Date('2022-09-13T08:46:24.000Z'),
                deletedAt: null
            },

            {
                id: '2',
                type: WhatsappMessageType.Text,
                message: 'Anima jogar um Catan hj?',
                status: WhatsappMessageStatus.Sent,
                isBusiness: true,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-13T09:22:24.000Z'),
                updatedAt: new Date('2022-09-13T09:22:24.000Z'),
                deletedAt: null
            },
            {
                id: '3',
                type: WhatsappMessageType.Text,
                message: 'E ai mano, tudo certo e com vc?',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: false,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-13T18:46:24.000Z'),
                updatedAt: new Date('2022-09-13T18:46:24.000Z'),
                deletedAt: null
            },
            {
                id: '4',
                type: WhatsappMessageType.Text,
                message: 'Animo demais!',
                status: WhatsappMessageStatus.Read,
                isBusiness: false,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-13T18:47:24.000Z'),
                updatedAt: new Date('2022-09-13T18:47:24.000Z'),
                deletedAt: null
            },
            {
                id: '5',
                type: WhatsappMessageType.Text,
                message:
                    'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using Content here, content here, making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for lorem ipsum will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: false,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-13T19:46:24.000Z'),
                updatedAt: new Date('2022-09-13T19:46:24.000Z'),
                deletedAt: null
            },
            {
                id: '6',
                type: WhatsappMessageType.Text,
                message: 'Seguraaaaaaaaaa que o bicho ta vindooooo!',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: false,
                isFirstMessageOfDay: true,
                createdAt: new Date('2022-09-14T14:16:24.000Z'),
                updatedAt: new Date('2022-09-14T14:16:24.000Z'),
                deletedAt: null
            },
            {
                id: '7',
                type: WhatsappMessageType.Text,
                message:
                    'Fala meu caro tudo bem? Estou fazendo uns testes na Cloud Api do Meta e estou precisando de um número de WhatsApp pra poder realizar mais testes',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: false,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-14T15:54:24.000Z'),
                updatedAt: new Date('2022-09-14T15:54:24.000Z'),
                deletedAt: null
            },
            {
                id: '8',
                type: WhatsappMessageType.Text,
                message: 'Vc tem algum número disponível aí?',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: false,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-15T16:46:24.000Z'),
                updatedAt: new Date('2022-09-15T16:46:24.000Z'),
                deletedAt: null
            },
            {
                id: '9',
                type: WhatsappMessageType.Text,
                message: 'Não sei como tá seu dia hoje, se animar entrar numa call seria otimo!',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: false,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-15T21:01:24.000Z'),
                updatedAt: new Date('2022-09-15T21:01:24.000Z'),
                deletedAt: null
            },
            {
                id: '10',
                type: WhatsappMessageType.Template,
                message:
                    'Ei Daniel, tudo certo?\nSou eu de novo, o(a) Zoppy! \nMuito obrigado por comprar conosco, você ganhou o cupom ZOPPY10 de 10% que poderá ser usado para compras acima de R$100,00, aproveite ;)\nEsse cupom é válido até o dia 10/10/2022.\nEntre em nosso site e aproveite!',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: true,
                isFirstMessageOfDay: true,
                createdAt: new Date('2022-09-15T22:51:24.000Z'),
                updatedAt: new Date('2022-09-15T22:51:24.000Z'),
                deletedAt: null
            },
            {
                id: '11',
                type: WhatsappMessageType.Text,
                message:
                    'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which dont look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isnt anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: true,
                isFirstMessageOfDay: false,
                createdAt: new Date('2022-09-15T23:59:24.000Z'),
                updatedAt: new Date('2022-09-15T23:59:24.000Z'),
                deletedAt: null
            },
            {
                id: '12',
                type: WhatsappMessageType.Template,
                message:
                    'Welcome and congratulations!! This message demonstrates your ability to send a message notification from WhatsApp Business Platforms Cloud API. Thank you for taking the time to test with us.',
                status: WhatsappMessageStatus.Delivered,
                isBusiness: true,
                isFirstMessageOfDay: true,
                createdAt: new Date('2022-09-16T06:09:03.431Z'),
                updatedAt: new Date('2022-09-16T06:09:03.431Z'),
                deletedAt: null
            }
        ];
        //this.chatRoom.threads = [];
        debugger;
        this.seeLastMessage();
    }

    public ngAfterViewInit(): void {
        this.addWheelEventListener();
    }

    public ngOnDestroy(): void {
        //this.closeChatSocket();
        //this.clearUnreadMessages();
        this.removeWheelEventListener();
    }

    public addWheelEventListener(): void {
        this.scrollerElement = document.getElementById(this.panelScrollableElementId);
        this.scrollerHandler = this.onWheelEventListener.bind(this);
        this.scrollerElement?.addEventListener('wheel', this.scrollerHandler, false);
    }

    public onWheelEventListener(event: WheelEvent): void {
        const scrolls: number = Math.abs(event.deltaY * 10);
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
        //not implemented
    }

    public showMessageTemplates(): void {
        //not implemented
    }

    public seeLastMessage(): void {
        setTimeout(() => {
            this.isLastMessage = true;
            this.chatUtility.scrollToBottom(this.panelScrollableElementId);
        });
    }
}
