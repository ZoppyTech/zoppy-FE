import { Component, OnInit } from '@angular/core';
import { DashboardBasePage } from '../../../dashboard.base.page';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CampaignService } from 'src/shared/services/campaign/campaign.service';
import { MessageTemplateService } from 'src/shared/services/message-template/message-template.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';
import { Navigation } from 'src/shared/utils/navigation';
import { MessageTemplateGroupEntity } from 'src/shared/models/entities/message-template-group.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { FileUtils } from '@ZoppyTech/utilities';

@Component({
    selector: 'app-campaign-config',
    templateUrl: './campaign-config.component.html',
    styleUrls: ['./campaign-config.component.scss']
})
export class CampaignConfigComponent extends DashboardBasePage implements OnInit {
    public loading: boolean = true;
    public loadingSave: boolean = false;
    public templateGroups: Array<MessageTemplateGroupEntity> = [];
    public messageTemplateGroup: MessageTemplateGroupEntity | undefined = undefined;

    public name: string = '';
    public messageTemplateGroupId?: string = undefined;
    public file: any;
    public option: string = 'now';
    public activationDate?: Date | undefined = new Date();

    public options: Option[] = [
        {
            label: 'Envio imediato',
            value: 'now'
        },
        {
            label: 'Agendar envio',
            value: 'scheduled'
        }
    ];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public toast: ToastService,
        public campaignService: CampaignService,
        public messageTemplateService: MessageTemplateService,
        public override storage: Storage,
        private readonly router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`campaigns`);
        this.setBreadcrumb();
        await this.fetchData();
        this.loading = false;
    }

    public validate(validateFile: boolean = true): Validation {
        if (!this.name)
            return {
                valid: false,
                message: 'O nome da campanha é obrigatório'
            };

        if (!this.messageTemplateGroupId)
            return {
                valid: false,
                message: 'O template da campanha é obrigatório'
            };

        if (!this.file && validateFile)
            return {
                valid: false,
                message: 'A planilha csv com os clientes é obrigatória'
            };

        return {
            valid: true,
            message: ''
        };
    }

    public async create() {
        const valid: Validation = this.validate();

        if (!valid.valid) {
            BroadcastService.emit('send-error', {
                title: 'Houveram erros de validação',
                message: valid.message
            });
            return;
        }

        try {
            this.loadingSave = true;
            await this.campaignService.create({
                name: this.name,
                messageTemplateGroupId: this.messageTemplateGroupId as string,
                activationDate: this.activationDate as Date,
                file: this.file
            });
            this.goBack();
            BroadcastService.emit('send-success', {
                title: 'Tudo certo!',
                message: `Campanha ${this.name} criada com sucesso!`
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houveram erros ao salvar sua campanha');
        } finally {
            this.loadingSave = false;
        }
    }

    public async download(): Promise<void> {
        const valid: Validation = this.validate(false);

        if (!valid.valid) {
            BroadcastService.emit('send-error', {
                title: 'Houveram erros de validação',
                message: valid.message
            });
            return;
        }

        try {
            const file: any = await this.campaignService.downloadSample(this.name, this.messageTemplateGroupId as string);
            FileUtils.downloadBlob(`${this.name}.csv`, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        }
    }

    public goBack(): void {
        this.router.navigate([Navigation.routes.campaignList]);
    }

    public async fetchData(): Promise<void> {
        try {
            this.templateGroups = await this.messageTemplateService.listApprovedGroups();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os templates');
        }
    }

    public async selectGroup(id: string): Promise<void> {
        try {
            setTimeout(async () => {
                this.messageTemplateGroup = await this.messageTemplateService.findGroup(id);
            }, 100);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o grupo');
        }
    }

    public invalidFileUploaded(): void {
        BroadcastService.emit('send-error', {
            message: 'Extensão de arquivo não permitida',
            title: 'Erro'
        });
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
                name: `Campanhas`,
                route: Navigation.routes.campaignList
            }
        ];
    }
}

interface Option {
    label: string;
    value: string;
}

interface Validation {
    message: string;
    valid: boolean;
}
