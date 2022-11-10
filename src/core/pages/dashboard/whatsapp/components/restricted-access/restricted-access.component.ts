import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { SignWhatsappAccountRequest } from 'src/shared/models/requests/whatsapp-account/sign-whatsapp-account.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';

@Component({
    selector: 'restricted-access',
    templateUrl: './restricted-access.component.html',
    styleUrls: ['./restricted-access.component.scss']
})
export class RestrictedAccessComponent implements OnInit {
    @Input() public isWhatsappActive: boolean = false;
    @Output() public isWhatsappActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public readonly CHAT_LAYOUT_IMAGE_DIR: string = './../../../../../../assets/imgs/welcome-zoppy-chat.png';
    public readonly CHAT_UPGRADE_IN_PROGRESS_IMAGE_DIR: string = './../../../../../../assets/imgs/chat_upgrade_in_progress.png';
    public readonly UNEXPECTED_ERROR_LOADING_CHAT_IMAGE_DIR: string = './../../../../../../assets/imgs/unexpected_error_loading_chat.png';

    public declare businessNameField: string;
    public declare descriptionField: string;
    public declare phoneNumberField: string;
    public declare signWhatsappRequest: SignWhatsappAccountRequest;
    public upgradeButtonLoading: boolean = false;

    public upgradePending: boolean = false;
    public activationPending: boolean = false;

    public accountEntity: WhatsappAccountEntity | null = null;

    public constructor(public readonly wppAccountService: WhatsappAccountService, private readonly toast: ToastService) {
        //no content
    }
    public async ngOnInit(): Promise<void> {
        await this.loadRegisteredWhatsappAccount();
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
                    permissions: WhatsappConstants.BUSINESS_PHONE_PERMISSIONS.ONLY_SEND,
                    default: true
                }
            };
            await this.wppAccountService.sign(request);
            await this.loadRegisteredWhatsappAccount();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.upgradeButtonLoading = false;
        }
    }

    public async loadRegisteredWhatsappAccount(): Promise<void> {
        try {
            this.accountEntity = await this.wppAccountService.getRegisteredByCompany();
        } finally {
            this.upgradePending = !this.accountEntity;
            this.activationPending = !this.upgradePending && this.accountEntity?.active === false;
            this.isWhatsappActive = !this.upgradePending && !this.activationPending;
            this.isWhatsappActiveChange.emit(this.isWhatsappActive);
        }
    }

    private validateFields(): void {
        if (!this.businessNameField) throw Error('Nome a exibir obrigatório');
        if (!this.descriptionField) throw Error('Descrição');
        if (!this.phoneNumberField) throw Error('Número do Whatsapp');
    }
}
