import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappConstants } from '@ZoppyTech/utilities';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { SignWhatsappAccountRequest } from 'src/shared/models/requests/whatsapp-account/sign-whatsapp-account.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { ChatAccount } from '../../../../models/chat-account';

@Component({
    selector: 'upgrade-pending-card',
    templateUrl: './upgrade-pending-card.component.html',
    styleUrls: ['./upgrade-pending-card.component.scss']
})
export class UpgradePendingCardComponent implements OnInit {
    @Input() public account: ChatAccount | null = null;
    @Output() public changeWhatsappStatusEvent: EventEmitter<WhatsappAccountEntity> = new EventEmitter();
    public readonly CHAT_LAYOUT_IMAGE_DIR: string = './../../../../../../assets/imgs/welcome-zoppy-chat.png';
    public declare businessNameField: string;
    public declare descriptionField: string;
    public declare phoneNumberField: string;
    public declare signWhatsappRequest: SignWhatsappAccountRequest;
    public upgradeButtonLoading: boolean = false;

    public constructor(public readonly wppAccountService: WhatsappAccountService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        console.log('init');
    }

    public async upgrade(): Promise<void> {
        this.upgradeButtonLoading = true;
        try {
            this.validateFields();
            const request: SignWhatsappAccountRequest = {
                businessName: this.businessNameField,
                description: this.descriptionField,
                businessPhone: {
                    phoneNumber: this.phoneNumberField,
                    businessHoursEnabled: false,
                    default: true
                }
            };
            const accountEntity: WhatsappAccountEntity = await this.wppAccountService.sign(request);
            this.changeWhatsappStatusEvent.emit(accountEntity);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.upgradeButtonLoading = false;
        }
    }

    private validateFields(): void {
        if (!this.phoneNumberField) throw Error('Campo "Número do Whatsapp" obrigatório!');
        if (!this.businessNameField) throw Error('Campo "Nome a exibir" obrigatório!');
        if (!this.descriptionField) throw Error('Campo "Descrição" obrigatório!');
    }
}
