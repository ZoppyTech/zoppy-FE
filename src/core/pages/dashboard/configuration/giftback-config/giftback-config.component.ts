import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WcGiftbackConfigEntity } from 'src/shared/models/entities/wc-giftback-config.entity';
import { GiftbackRequest } from 'src/shared/models/requests/giftback/giftback.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcGiftbackService } from 'src/shared/services/wc-giftback/wc-giftback.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-giftback-config',
    templateUrl: './giftback-config.component.html',
    styleUrls: ['./giftback-config.component.scss']
})
export class GiftbackConfigComponent implements OnInit {
    public giftback: GiftbackRequest = {};
    public loading: boolean = false;

    public constructor(
        private readonly toast: ToastService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public giftbackService: WcGiftbackService
    ) {}

    public async ngOnInit() {
        this.setBreadcrumb();
        this.sideMenuService.changeSub(`giftback`);
        this.sideMenuService.change('configurations');
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            this.giftback = ((await this.giftbackService.find()) as GiftbackRequest) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu token de acesso');
        }
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: GiftbackRequest = {
                id: this.giftback.id,
                percentValue: parseInt(this.giftback.percentValue?.toString() ?? ''),
                maxPercentValue: parseInt(this.giftback.maxPercentValue?.toString() ?? ''),
                expirationDays: parseInt(this.giftback.expirationDays?.toString() ?? ''),
                startDays: parseInt(this.giftback.startDays?.toString() ?? '')
            };
            const response: WcGiftbackConfigEntity = this.giftback.id
                ? await this.giftbackService.update(request)
                : await this.giftbackService.create(request);
            this.giftback = response as GiftbackRequest;
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    public getSaveDisabled(): boolean {
        return !this.giftback.maxPercentValue || !this.giftback.percentValue || !this.giftback.expirationDays;
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
                name: `Configuração de Giftback`,
                route: Navigation.routes.giftback
            }
        ];
    }
}
