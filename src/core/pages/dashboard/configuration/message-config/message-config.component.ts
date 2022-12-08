import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { MessageConfigEntity } from 'src/shared/models/entities/message-config.entity';
import { MessageConfigRequest } from 'src/shared/models/requests/message-config/message-config.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { MessageConfigService } from 'src/shared/services/message-config/message-config.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-message-config',
    templateUrl: './message-config.component.html',
    styleUrls: ['./message-config.component.scss']
})
export class MessageConfigComponent implements OnInit {
    public loading: boolean = false;
    public config: MessageConfigRequest = {};
    public params: Param[] = [
        {
            name: '{{client_name}}',
            description: 'O primeiro nome do cliente'
        },
        {
            name: '{{name}}',
            description: 'Seu nome'
        },
        {
            name: '{{company_name}}',
            description: 'Nome Social da empresa'
        },
        {
            name: '{{last_purchase_date}}',
            description: 'Data da última compra do cliente'
        }
    ];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public confirmActionService: ConfirmActionService,
        public messageConfigService: MessageConfigService,
        private readonly toast: ToastService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.sideMenuService.changeSub(`messageConfig`);
        this.sideMenuService.change('configurations');
        this.generateBreadcrumb();
        await this.fetchData();
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: MessageConfigRequest = {
                cantLoseClientMessage: this.config.cantLoseClientMessage,
                afterSaleMessage: this.config.afterSaleMessage,
                birthdayMessage: this.config.birthdayMessage,
                birthdayMonthMessage: this.config.birthdayMonthMessage
            };
            const response: MessageConfigEntity = this.config?.id
                ? await this.messageConfigService.update(this.config.id, request)
                : await this.messageConfigService.create(request as MessageConfigRequest);
            this.config = response as MessageConfigRequest;
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    private async fetchData(): Promise<void> {
        try {
            this.config = (await this.messageConfigService.find()) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu Token');
        }
    }

    private generateBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Configuração de mensagens`,
                route: `/dashboard/configurations/message-config`
            }
        ];
    }
}

interface Param {
    name: string;
    description: string;
}
