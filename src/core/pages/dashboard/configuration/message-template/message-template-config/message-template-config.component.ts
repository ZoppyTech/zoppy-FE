import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { MessageTemplateEntity } from 'src/shared/models/entities/message-template.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { MessageTemplateService } from 'src/shared/services/message-template/message-template.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';
import { Navigation } from 'src/shared/utils/navigation';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { ZoppyException } from 'src/shared/services/api.service';
import { DashboardBasePage } from 'src/core/pages/dashboard/dashboard.base.page';
import { MessageTemplateGroupEntity } from 'src/shared/models/entities/message-template-group.entity';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';

@Component({
    selector: 'app-message-template-config',
    templateUrl: './message-template-config.component.html',
    styleUrls: ['./message-template-config.component.scss']
})
export class MessageTemplateConfigComponent extends DashboardBasePage implements OnInit {
    public templates: Array<MessageTemplateEntity> = [];
    public group: MessageTemplateGroupEntity | undefined;
    public loaded: boolean = false;
    public loading: boolean = false;
    public groupId: string = '';
    public tab: string = '';
    public name: string = '';
    public description: string = '';
    public wppAccount?: WhatsappAccountEntity = undefined;

    public showModal(): void {
        this.modal.open(Modal.IDENTIFIER.MESSAGE_CONFIG_PARAMS, {});
    }

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public messageTemplateService: MessageTemplateService,
        public toast: ToastService,
        public override storage: Storage,
        public modal: ModalService,
        private readonly confirmActionService: ConfirmActionService,
        public whatsappAccountService: WhatsappAccountService,
        private readonly router: Router,
        private route: ActivatedRoute
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.route.paramMap.subscribe(async (paramMap: any) => {
            this.groupId = paramMap.get('id');
            this.tab = paramMap.get('tab');
            if (!this.groupId) this.loaded = true;
            await this.fetchData();
            this.setBreadcrumb();
            this.sideMenuService.change('configurations');
            this.sideMenuService.changeSub('messageTemplate');
        });
    }

    public async fetchData(): Promise<void> {
        if (!this.groupId) return;
        this.group = await this.messageTemplateService.findGroup(this.groupId);
        this.templates = this.group.messageTemplates;
        this.wppAccount = await this.whatsappAccountService.getRegisteredByCompany();
        this.loaded = true;
    }

    public async save(): Promise<void> {
        if (!this.groupId) {
            if (!this.name || !this.description) {
                this.toast.error('Informações incompletas', 'Insira nome e descrição do grupo');
                return;
            }

            const group: MessageTemplateGroupEntity = await this.messageTemplateService.createGroup({
                name: this.name,
                description: this.description,
                type: 'whatsapp'
            });

            this.groupId = group.id;
        }

        const promises: Array<any> = [];
        this.templates.forEach((template: MessageTemplateEntity, index: number) => {
            template.id
                ? promises.push(
                      this.messageTemplateService.update(template.id, this.groupId, {
                          text: template.text,
                          position: index + 1
                      })
                  )
                : promises.push(
                      this.messageTemplateService.create(this.groupId, {
                          text: template.text,
                          position: index + 1
                      })
                  );
        });
        await Promise.all(promises);
        this.toast.success('Informações salvas com sucesso.', `Sucesso!`);
        this.tab
            ? this.router.navigate([Navigation.routes.automationForm, this.tab])
            : this.router.navigate([Navigation.routes.messageTemplateList]);
    }

    public async deleteTemplate(template: MessageTemplateEntity, index: number): Promise<void> {
        if (!template.id) {
            this.templates = this.templates.filter((template: MessageTemplateEntity, templateIndex: number) => index !== templateIndex);
            return;
        }

        this.confirmActionService.open(
            'Deletar o template',
            'Tem certeza que deseja deletar esse template? Essa ação nao poderá ser desfeita.',
            async (result: boolean) => {
                if (!result) return;
                try {
                    await this.messageTemplateService.destroy(template.id, this.groupId);
                    await this.fetchData();
                    this.toast.success('Esse template foi removido e não pode ser mais usado', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível deletar esse template');
                }
            }
        );
    }

    public addNewMessage(): void {
        this.templates.push(new MessageTemplateEntity());
    }

    public getHref(): string {
        if (!this.tab) return '/dashboard/configurations/templates';
        return `/dashboard/configurations/automations/form/${this.tab}`;
    }

    private setBreadcrumb(): void {
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
                name: `Templates de mensagens`,
                route: Navigation.routes.messageTemplate
            },
            {
                name: this.groupId ? 'Editar' : 'Criar',
                route: Navigation.routes.messageTemplateConfig
            }
        ];
    }
}
