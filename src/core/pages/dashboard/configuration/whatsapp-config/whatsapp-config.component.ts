import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountPhoneNumberEntity } from 'src/shared/models/entities/whatsapp-account-phone-number.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappAccountPhoneNumberRequest } from 'src/shared/models/requests/whatsapp-account-phone-number/whatsapp-account-phone-number.request';
import { WhatsappAccountRequest } from 'src/shared/models/requests/whatsapp-account/whatsapp-account.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WhatsappAccountPhoneNumberService } from 'src/shared/services/whatsapp-account-phone-number/whatsapp-account-phone-number.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'whatsapp-config',
    templateUrl: './whatsapp-config.component.html',
    styleUrls: ['./whatsapp-config.component.scss']
})
export class WhatsappConfigComponent implements OnInit {
    public activateLoading: boolean = false;
    public disableLoading: boolean = false;
    public user: UserEntity = new UserEntity();
    public whatsappAccount: WhatsappAccountEntity = new WhatsappAccountEntity();
    public whatsappAccountPhone: WhatsappAccountPhoneNumberEntity = new WhatsappAccountPhoneNumberEntity();
    public webhookUrl: string = '';

    public currentStatus: any = {
        scenario: WhatsappConstants.ACCOUNT_SCENARIO.IDLE,
        color: '#C6C6C6',
        text: 'Inativo'
    };

    public readonly integrationStatus: Array<any> = [
        {
            scenario: WhatsappConstants.ACCOUNT_SCENARIO.IDLE,
            color: '#C6C6C6',
            text: 'Conta inativa'
        },
        {
            scenario: WhatsappConstants.ACCOUNT_SCENARIO.ACQUISITION,
            color: '#7B3DFF',
            text: 'Integração solicitada'
        },
        {
            scenario: WhatsappConstants.ACCOUNT_SCENARIO.VALIDATION,
            color: '#FFAD4E',
            text: 'Integração em andamento'
        },
        {
            scenario: WhatsappConstants.ACCOUNT_SCENARIO.INTEGRATED,
            color: '#30E1A1',
            text: 'Conta ativada com sucesso'
        },
        {
            scenario: WhatsappConstants.ACCOUNT_SCENARIO.REVOKED,
            color: '#EB0000',
            text: 'Conta desativada'
        }
    ];

    public view: any = '*';
    public items: Array<Item> = [
        {
            label: 'Todos',
            value: '*'
        },
        {
            label: 'Somente enviar mensagens',
            value: 'ONLY_SEND'
        },
        {
            label: 'Somente ler mensagens',
            value: 'ONLY_RECEIVE'
        }
    ];

    public constructor(
        public readonly wppAccountService: WhatsappAccountService,
        public readonly wppAccountPhoneNumberService: WhatsappAccountPhoneNumberService,
        public confirmActionService: ConfirmActionService,
        private readonly sideMenuService: SideMenuService,
        private readonly breadcrumb: BreadcrumbService,
        private readonly modal: ModalService,
        private readonly toast: ToastService,
        private readonly storage: Storage
    ) {}

    public async ngOnInit(): Promise<void> {
        this.setBreadcrumbItems();
        this.sideMenuService.changeSub('whatsapp');
        this.sideMenuService.change('configurations');
        this.setLoggedUser();
        await this.loadWhatsappRegisteredAccount();
        await this.loadWhatsappDefaultPhoneNumber();
    }

    public async loadWhatsappRegisteredAccount(): Promise<void> {
        try {
            this.whatsappAccount = await this.wppAccountService.getRegisteredByCompany();
            this.makeWebhookUrl();
        } catch (ex: any) {
            this.whatsappAccount.active = false;
            this.whatsappAccount.scenario = WhatsappConstants.ACCOUNT_SCENARIO.IDLE;
        }
        this.setCurrentStatus();
    }

    public async loadWhatsappDefaultPhoneNumber(): Promise<void> {
        try {
            this.whatsappAccountPhone = await this.wppAccountPhoneNumberService.findDefault(this.whatsappAccount.id);
        } catch (ex: any) {
            this.whatsappAccountPhone.permissions = WhatsappConstants.BUSINESS_PHONE_PERMISSIONS.ALL;
        }
    }

    public async activate(): Promise<void> {
        this.activateLoading = true;
        try {
            const request: WhatsappAccountRequest = this.buildWhatsappAccountRequest();
            if (!this.whatsappAccount.id) {
                this.whatsappAccount = await this.wppAccountService.create(request);
                this.makeWebhookUrl();
                this.toast.success('Conta comercial do Whatsapp criada com êxito.', 'Sucesso!');
                return;
            }
            this.whatsappAccount = await this.wppAccountService.update(request);
            this.toast.success('Conta comercial do Whatsapp atualizada com êxito!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.activateLoading = false;
        }
        this.setCurrentStatus();
    }

    public async disable(): Promise<void> {
        this.confirmActionService.open(
            'Desativar conta Whatsapp',
            'Tem certeza que deseja desativar esta conta? ',
            async (result: boolean) => {
                if (!result) return;
                this.disableLoading = true;
                try {
                    if (!this.whatsappAccount.id) {
                        this.toast.error('Falha ao tentar desativar uma integração não realizada!', 'Erro!');
                        return;
                    }
                    await this.wppAccountService.revoke(this.whatsappAccount.id);
                    await this.loadWhatsappRegisteredAccount();
                    await this.loadWhatsappDefaultPhoneNumber();
                    this.toast.success('Conta comercial do Whatsapp desativada com êxito!', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Erro!');
                } finally {
                    this.disableLoading = false;
                }
            }
        );
    }

    public copyWebhookUrlToClipboard(): void {
        navigator.clipboard.writeText(this.webhookUrl as string);
        this.toast.success('Url gerada copiada para a área de transferência', `Copiado!`);
    }

    public copyWebhookTokenToClipboard(): void {
        navigator.clipboard.writeText(this.whatsappAccount.webhookVerifyToken as string);
        this.toast.success('Token de verificação copiado para a área de transferência', `Copiado!`);
    }

    private buildWhatsappAccountRequest(): WhatsappAccountRequest {
        return {
            id: this.whatsappAccount.id,
            businessName: this.whatsappAccount.businessName,
            description: this.whatsappAccount.description,
            wabaId: this.whatsappAccount.wabaId,
            appId: this.whatsappAccount.appId,
            apiAccessToken: this.whatsappAccount.apiAccessToken,
            businessPhone: {
                id: this.whatsappAccountPhone.id,
                phoneNumberId: this.whatsappAccountPhone.phoneNumberId,
                permissions: this.whatsappAccountPhone.permissions,
                default: true
            } as WhatsappAccountPhoneNumberRequest
        };
    }

    private makeWebhookUrl(): void {
        this.webhookUrl = `${window.location.origin}/api/whatsapp-account/${this.whatsappAccount.id}/webhook`;
    }

    private setCurrentStatus(): void {
        this.currentStatus = this.integrationStatus.find((status: any) => {
            return status.scenario === this.whatsappAccount.scenario;
        });
    }

    private setLoggedUser(): void {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
    }

    private setBreadcrumbItems(): void {
        this.breadcrumb.items = [
            {
                name: 'Início',
                route: undefined
            },
            {
                name: 'Configurações',
                route: undefined
            },
            {
                name: 'Whatsapp',
                route: '/dashboard/configurations/whatsapp'
            }
        ];
    }
}

type View = '*' | 'ONLY_SEND' | 'ONLY_RECEIVE';
class Item {
    public declare label: string;
    public declare value: View;
}
