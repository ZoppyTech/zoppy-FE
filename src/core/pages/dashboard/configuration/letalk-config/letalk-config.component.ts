import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { LetalkConfigEntity } from 'src/shared/models/entities/letalk-config.entity';
import { LetalkConfigRequest } from 'src/shared/models/requests/letalk/letalk.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { LetalkConfigService } from 'src/shared/services/letalk-config/letalk-config.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-letalk-config',
    templateUrl: './letalk-config.component.html',
    styleUrls: ['./letalk-config.component.scss']
})
export class LetalkConfigComponent implements OnInit {
    public loading: boolean = false;
    public config: LetalkConfigRequest = {};

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public confirmActionService: ConfirmActionService,
        public letalkConfigService: LetalkConfigService,
        private readonly toast: ToastService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.sideMenuService.changeSub(`letalk`);
        this.sideMenuService.change('configurations');
        this.generateBreadcrumb();
        await this.fetchData();
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: LetalkConfigRequest = {
                sendGiftbackUrl: this.config.sendGiftbackUrl,
                sendGiftbackCloseReminderUrl: this.config.sendGiftbackCloseReminderUrl,
                sendGiftbackReminderUrl: this.config.sendGiftbackReminderUrl
            };
            const response: LetalkConfigEntity = this.config?.id
                ? await this.letalkConfigService.update(this.config.id, request)
                : await this.letalkConfigService.create(request as LetalkConfigRequest);
            this.config = response as LetalkConfigRequest;
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    public getSaveDisabled(): boolean {
        return !this.config.sendGiftbackCloseReminderUrl || !this.config.sendGiftbackReminderUrl || !this.config.sendGiftbackUrl;
    }

    private async fetchData(): Promise<void> {
        try {
            this.config = (await this.letalkConfigService.find()) || {};
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
                name: `Configuração Letalk`,
                route: `/dashboard/configurations/letalk`
            }
        ];
    }
}
