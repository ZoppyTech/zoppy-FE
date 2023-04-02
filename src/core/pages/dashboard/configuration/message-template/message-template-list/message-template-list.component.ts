import { Router } from '@angular/router';
import { MessageTemplateService } from './../../../../../../shared/services/message-template/message-template.service';
import { MessageTemplateGroupEntity } from './../../../../../../shared/models/entities/message-template-group.entity';
import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { ToastService } from '@ZoppyTech/toast';
import { Storage } from 'src/shared/utils/storage';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { DashboardBasePage } from '../../../dashboard.base.page';
import { ZoppyException } from 'src/shared/services/api.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-message-template-list',
    templateUrl: './message-template-list.component.html',
    styleUrls: ['./message-template-list.component.scss']
})
export class MessageTemplateListComponent extends DashboardBasePage implements OnInit {
    public groups: Array<MessageTemplateGroupEntity> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public messageTemplateService: MessageTemplateService,
        public toast: ToastService,
        public override storage: Storage,
        private readonly confirmActionService: ConfirmActionService,
        private readonly router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
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
            }
        ];
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`messageTemplate`);
        await this.fetchData();
    }

    public async updateGroup(group: MessageTemplateGroupEntity): Promise<void> {
        this.router.navigate([Navigation.routes.messageTemplateConfig, group.id]);
    }

    public async fetchData(): Promise<void> {
        try {
            this.groups = await this.messageTemplateService.listGroups();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os grupos de templates de mensagem');
        }
    }

    public getEditHref(group: MessageTemplateGroupEntity): string {
        return `/dashboard/configurations/message-template/${group.id}`;
    }

    public createGroup(): void {
        this.router.navigate([Navigation.routes.messageTemplateConfig]);
    }

    public async destroy(group: MessageTemplateGroupEntity): Promise<void> {
        this.confirmActionService.open(
            'Deletar o grupo',
            'Tem certeza que deseja deletar esse grupo? Essa ação nao poderá ser desfeita.',
            async (result: boolean) => {
                if (!result) return;
                try {
                    await this.messageTemplateService.destroyGroup(group.id);
                    await this.fetchData();
                    this.toast.success('Esse grupo foi removido e não pode ser mais usado', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível deletar esse grupo');
                }
            }
        );
    }
}
