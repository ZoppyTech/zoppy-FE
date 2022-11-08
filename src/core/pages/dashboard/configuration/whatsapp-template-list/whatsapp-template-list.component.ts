import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappMessageTemplateEntity } from 'src/shared/models/entities/whatsapp-message-template.entity';
import { WhatsappManagedMessageTemplateRequest } from 'src/shared/models/requests/whatsapp-business-management/whatsapp-managed-message-template.request';
import { WhatsappUpdateMessageTemplateRequest } from 'src/shared/models/requests/whatsapp-business-management/whatsapp-update-message-template.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { WhatsappBusinessManagementService } from 'src/shared/services/whatsapp-business-management/whatsapp-business-management.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'whatsapp-template-list',
    templateUrl: './whatsapp-template-list.component.html',
    styleUrls: ['./whatsapp-template-list.component.scss']
})
export class WhatsappTemplateListComponent implements OnInit {
    public messageTemplatesLoading: boolean = true;
    public pullLoading: boolean = false;
    public saveLoading: boolean = false;
    public user: UserEntity = new UserEntity();
    public declare whatsappAccount: WhatsappAccountEntity;

    public messageTemplates: Array<WhatsappMessageTemplateEntity> = [];

    public view: any = '*';
    public items: Array<Item> = [
        {
            label: 'Todos',
            value: '*'
        },
        {
            label: 'Usuário',
            value: 'USER'
        },
        {
            label: 'Sistema',
            value: 'SYSTEM'
        }
    ];

    public constructor(
        public readonly wppAccountService: WhatsappAccountService,
        public readonly wppBusinessManagementService: WhatsappBusinessManagementService,
        public confirmActionService: ConfirmActionService,
        private readonly sideMenuService: SideMenuService,
        private readonly breadcrumb: BreadcrumbService,
        private readonly modal: ModalService,
        private readonly toast: ToastService,
        private readonly storage: Storage
    ) {}

    public async ngOnInit(): Promise<void> {
        this.whatsappAccount = new WhatsappAccountEntity();
        this.setBreadcrumbItems();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub('whatsappTemplateList');
        this.setLoggedUser();
        await this.loadWhatsappRegisteredAccount();
        await this.loadWhatsappMessageTemplates();
    }

    public async onVisibilityValueChange(visibility: string, messageTemplate: WhatsappMessageTemplateEntity): Promise<void> {
        try {
            const request: WhatsappUpdateMessageTemplateRequest = {
                id: messageTemplate.id,
                status: messageTemplate.status,
                visibility: visibility,
                wppAccountId: messageTemplate.wppAccountId
            };
            console.log(request);
            await this.wppBusinessManagementService.update(request);
            this.toast.success('Visibilidade alterada com êxito!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        }
    }

    public async loadWhatsappRegisteredAccount(): Promise<void> {
        try {
            this.whatsappAccount = await this.wppAccountService.getRegisteredByCompany();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        }
    }

    public async loadWhatsappMessageTemplates(): Promise<void> {
        this.messageTemplatesLoading = true;
        try {
            this.messageTemplates = await this.wppBusinessManagementService.list();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.messageTemplatesLoading = false;
        }
    }

    public async delete(id: string): Promise<void> {
        this.confirmActionService.open('Deletar modelo', 'Tem certeza que deseja deletar este modelo? ', async (result: boolean) => {
            if (!result) return;
            try {
                await this.wppBusinessManagementService.destroy(id);
                this.messageTemplates = this.messageTemplates.filter((messageTemplate: any) => messageTemplate.id !== id);
                this.toast.success('Modelo de mensagem removido com sucesso', 'Sucesso!');
            } catch (ex: any) {
                ex = ex as ZoppyException;
                this.toast.error(ex.message, 'Erro!');
            }
        });
    }

    public async pull(): Promise<void> {
        this.pullLoading = true;
        try {
            const request: WhatsappManagedMessageTemplateRequest = {
                wppAccountId: this.whatsappAccount.id,
                overwrite: false
            };
            this.messageTemplates = await this.wppBusinessManagementService.pull(request);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.pullLoading = false;
        }
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
                route: '/dashboard/configurations/whatsapp-template-list'
            }
        ];
    }
}

type View = '*' | 'USER' | 'SYSTEM';
class Item {
    public declare label: string;
    public declare value: View;
}
