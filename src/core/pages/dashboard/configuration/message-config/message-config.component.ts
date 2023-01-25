import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { MessageConfigEntity } from 'src/shared/models/entities/message-config.entity';
import { MessageConfigRequest } from 'src/shared/models/requests/message-config/message-config.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { MessageConfigService } from 'src/shared/services/message-config/message-config.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-message-config',
    templateUrl: './message-config.component.html',
    styleUrls: ['./message-config.component.scss']
})
export class MessageConfigComponent implements OnInit {
    public loading: boolean = false;
    public config: MessageConfigRequest = {};

    public constructor(
        public modal: ModalService,
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
                birthdayMonthMessage: this.config.birthdayMonthMessage,
                npsRatingMessage: this.config.npsRatingMessage
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

    public showModal(): void {
        this.modal.open(Modal.IDENTIFIER.MESSAGE_CONFIG_PARAMS, {});
    }

    private generateBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Configuração de mensagens`,
                route: Navigation.routes.messageConfig
            }
        ];
    }
}
