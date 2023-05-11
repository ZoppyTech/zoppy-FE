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
import { SyncGroupWhatsappRequest } from 'src/shared/models/requests/message-template/sync-group-whatsapp.request';
import { MessageTemplateUtil } from '@ZoppyTech/utilities';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { WhatsappMessageTemplateType } from 'src/shared/models/entities/whatsapp-message-template.entity';

@Component({
    selector: 'app-message-template-config',
    templateUrl: './message-template-config.component.html',
    styleUrls: ['./message-template-config.component.scss']
})
export class MessageTemplateConfigComponent extends DashboardBasePage implements OnInit {
    public templates: Array<MessageTemplateEntity> = [];
    public group?: MessageTemplateGroupEntity = undefined;
    public wppTemplateRequest: SyncGroupWhatsappRequest = new SyncGroupWhatsappRequest();
    public loaded: boolean = false;
    public loading: boolean = false;
    public groupId: string = '';
    public tab: string = '';
    public name: string = '';
    public description: string = '';
    public wppAccount?: WhatsappAccountEntity = undefined;

    public types: DropdownOption[] = [
        {
            label: 'Texto',
            value: 'text'
        },
        {
            label: 'Imagem',
            value: 'image'
        },
        {
            label: 'Vídeo',
            value: 'video'
        }
    ];
    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public messageTemplateService: MessageTemplateService,
        public toastService: ToastService,
        public override storage: Storage,
        public modal: ModalService,
        private readonly confirmActionService: ConfirmActionService,
        public whatsappAccountService: WhatsappAccountService,
        private readonly router: Router,
        private route: ActivatedRoute
    ) {
        super(storage);
    }

    public showModal(): void {
        this.modal.open(Modal.IDENTIFIER.MESSAGE_CONFIG_PARAMS, {});
    }

    public onTypeChange(type: string): void {
        this.wppTemplateRequest.type = type as WhatsappMessageTemplateType;
        this.wppTemplateRequest.headerMessage = '';
        this.wppTemplateRequest.file = null;
    }

    public async ngOnInit() {
        this.loaded = false;
        this.route.paramMap.subscribe(async (paramMap: any) => {
            this.groupId = paramMap.get('id');
            this.tab = paramMap.get('tab');
            this.setBreadcrumb();
            this.sideMenuService.change('configurations');
            this.sideMenuService.changeSub('messageTemplate');
            await this.fetchData();
        });
    }

    public getBodyText(): string {
        if (!this.templates) return '';
        return this.templates.map((template: MessageTemplateEntity) => template.text).join(`\n\n`);
    }

    public async fetchData(): Promise<void> {
        if (!this.groupId) {
            this.wppAccount = await this.whatsappAccountService.getRegisteredByCompany();
            this.templates = [];
            this.addNewMessage();
            this.loaded = true;
            this.wppTemplateRequest = {
                headerMessage: '',
                footerMessage: '',
                ctaLabel: '',
                ctaLink: '',
                visible: true,
                type: 'text'
            };
            return;
        }
        this.group = await this.messageTemplateService.findGroup(this.groupId);
        this.templates = this.group.messageTemplates;
        try {
            this.wppAccount = await this.whatsappAccountService.getRegisteredByCompany();
        } catch (ex) {
            console.log(ex);
        }

        setTimeout(async () => {
            this.wppTemplateRequest = {
                headerMessage: this.group?.wppMessageTemplate?.headerMessage ?? '',
                footerMessage: this.group?.wppMessageTemplate?.footerMessage ?? '',
                ctaLabel: this.group?.wppMessageTemplate?.ctaLabel ?? '',
                ctaLink: this.group?.wppMessageTemplate?.ctaLink ?? '',
                visible: this.group?.wppMessageTemplate?.visible ?? false,
                type: this.group?.wppMessageTemplate?.type ?? 'text',
                file: ['video', 'image'].includes(this.group?.wppMessageTemplate?.type as string)
                    ? await this.convertUrlToFile(
                          this.group?.wppMessageTemplate?.headerMessage as string,
                          this.group?.wppMessageTemplate?.type as string
                      )
                    : null
            };
            this.loaded = true;
        }, 100);
    }

    private async convertUrlToFile(url: string, type: string): Promise<File> {
        const metadata: FilePropertyBag = {
            type: type === 'image' ? 'image/png' : 'video/mp4'
        };
        const fileName: string = type === 'image' ? 'image.png' : 'video.mp4';
        const file: File = new File([], fileName, metadata);
        return file;
    }

    private validate(): Validate {
        let validate: Validate = {
            valid: true,
            message: ''
        };

        if (!this.groupId && (!this.name || !this.description || !this.templates.length)) {
            validate = {
                valid: false,
                message: 'Insira nome e descrição do grupo'
            };
        }

        for (const template of this.templates) {
            if (!template.text) {
                validate = {
                    valid: false,
                    message: 'Conteúdo da mensagem é obrigatorio'
                };
            }

            const templateParams: string[] = MessageTemplateUtil.extractTemplateParameters(template.text);

            for (const param of templateParams) {
                if (!MessageTemplateUtil.validateTemplateParameter(param)) {
                    validate = {
                        valid: false,
                        message: 'Parâmetro inválido no seu template'
                    };
                }
            }
        }

        if (this.wppAccount && this.wppTemplateRequest) {
            const headerParams: string[] = MessageTemplateUtil.extractTemplateParameters(this.wppTemplateRequest.headerMessage);
            for (const param of headerParams) {
                if (!MessageTemplateUtil.validateTemplateParameter(param)) {
                    validate = {
                        valid: false,
                        message: 'Parâmetro inválido no seu cabeçalho'
                    };
                }
            }

            if (this.wppTemplateRequest.ctaLabel && !this.wppTemplateRequest.ctaLink)
                validate = {
                    valid: false,
                    message: 'Link obrigatório para haver botão de ação'
                };

            if (!this.wppTemplateRequest.ctaLabel && this.wppTemplateRequest.ctaLink)
                validate = {
                    valid: false,
                    message: 'Texto obrigatório para haver botão de ação'
                };

            if (this.templates.length > 1)
                validate = {
                    valid: false,
                    message: 'Com a configuração do whatsapp, não é permitido criar mais de um template'
                };
        }

        return validate;
    }

    public invalidFileUploaded(): void {
        BroadcastService.emit('send-error', {
            message: 'Extensão de arquivo não permitida',
            title: 'Erro'
        });
    }

    public onFileChange(file: File): void {
        this.wppTemplateRequest.file = file;
        this.wppTemplateRequest.headerMessage = file ? URL.createObjectURL(file) : '';
    }

    public async save(): Promise<void> {
        const valid: Validate = this.validate();

        if (!valid.valid) {
            BroadcastService.emit('send-error', {
                message: valid.message,
                title: 'Houveram erros de validação'
            });
            return;
        }

        this.loading = true;

        if (!this.groupId) {
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
        try {
            await Promise.all(promises);
            if (this.wppAccount) await this.messageTemplateService.syncGroupWithWhatsapp(this.groupId, this.wppTemplateRequest);
            this.toastService.success('Informações salvas com sucesso.', `Sucesso!`);
            this.tab
                ? this.router.navigate([Navigation.routes.automationForm, this.tab])
                : this.router.navigate([Navigation.routes.messageTemplateList]);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            BroadcastService.emit('send-error', {
                message: ex.message,
                title: 'Houve um erro!'
            });
            this.router.navigate([Navigation.routes.messageTemplateList]);
        } finally {
            this.loading = false;
        }
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
                    BroadcastService.emit('send-success', {
                        message: 'Esse template foi removido e não pode ser mais usado',
                        title: 'Sucesso!'
                    });
                    this.toastService.success('Esse template foi removido e não pode ser mais usado', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    BroadcastService.emit('send-error', {
                        message: ex.message,
                        title: 'Não foi possível deletar esse template'
                    });
                }
            }
        );
    }

    public addNewMessage(): void {
        this.templates.push({
            text: ''
        } as MessageTemplateEntity);
    }

    public getHref(): string {
        if (!this.tab) return '/dashboard/configurations/templates';
        return `/dashboard/configurations/automations/form/${this.tab}`;
    }

    public goBack(): void {
        if (!this.tab) {
            this.router.navigate([Navigation.routes.messageTemplateList]);
            return;
        }
        this.router.navigate([Navigation.routes.automationForm, this.tab]);
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

interface Validate {
    valid: boolean;
    message: string;
}

interface DropdownOption {
    value: WhatsappMessageTemplateType;
    label: string;
}
