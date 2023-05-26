import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Component, OnInit, Provider } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../../dashboard.base.page';
import { WcGiftbackService } from 'src/shared/services/wc-giftback/wc-giftback.service';
import { WcGiftbackConfigEntity } from 'src/shared/models/entities/wc-giftback-config.entity';
import { GiftbackRequest } from 'src/shared/models/requests/giftback/giftback.request';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { UserUtil } from '@ZoppyTech/utilities';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';

@Component({
    selector: 'app-base',
    templateUrl: './base.component.html',
    styleUrls: ['./base.component.scss']
})
export class BaseComponent extends DashboardBasePage implements OnInit {
    public providers: ProviderCard[] = [];
    public loading: boolean = true;
    public config: WcGiftbackConfigEntity = new WcGiftbackConfigEntity();

    public constructor(
        public sideMenuService: SideMenuService,
        public giftbackService: WcGiftbackService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.setBreadcrumbItems();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`automations`);
        this.config = await this.giftbackService.find();
        this.setProviders();
        this.loading = false;
    }

    public async updateEnabled(active: boolean, provider: ProviderCard): Promise<void> {
        (this.config as any)[provider.id] = active;
        const request: GiftbackRequest = {
            id: this.config.id,
            percentValue: this.config.percentValue,
            maxPercentValue: this.config.maxPercentValue,
            expirationDays: this.config.expirationDays,
            startDays: this.config.startDays,
            afterSaleDays: this.config.afterSaleDays,
            abandonedCartDelay: this.config.abandonedCartDelay,
            npsRatingDays: this.config.npsRatingDays,
            excludeSaleItems: this.config.excludeSaleItems,
            allowedCategories: this.config.allowedCategories,
            acumulative: this.config.acumulative,
            enableGiftback: this.config.enableGiftback,
            enableAfterSale: this.config.enableAfterSale,
            enableNPS: this.config.enableNPS,
            enableBirthday: this.config.enableBirthday,
            enableAbandonedCart: this.config.enableAbandonedCart,
            sendCloseReminder: this.config.sendCloseReminder,
            sendReminder: this.config.sendReminder
        };

        await this.giftbackService.update(request);
        active ? this.toast.success('Fluxo ativado com sucesso!', 'Sucesso') : this.toast.alert('Fluxo desativado com sucesso!', 'Sucesso');
    }

    public goToForm(provider: ProviderCard): void {
        if (provider.routeParam) this.router.navigate([provider.route, provider.routeParam]);
        else this.router.navigate([provider.route]);
    }

    private setBreadcrumbItems(): void {
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
                name: `Automações`,
                route: Navigation.routes.automations
            }
        ];
    }

    private setProviders(): void {
        this.providers = [
            {
                name: 'Giftback',
                icon: 'icon-confirmation_number',
                description: 'Configure as propriedades de funcionamento dos giftbacks gerados pela Zoppy em sua loja!',
                active: this.config?.enableGiftback ?? false,
                id: 'enableGiftback',
                tab: 'giftback',
                routeParam: 'giftback',
                route: Navigation.routes.automationForm
            },
            {
                name: 'Pós-venda',
                icon: 'icon-local_mall',
                description:
                    'Configure as propriedades da criação da tarefa de pós venda e defina o template da mensagem enviada nessa tarefa!',
                active: this.config?.enableAfterSale ?? false,
                id: 'enableAfterSale',
                tab: 'after_sale',
                routeParam: 'after_sale',
                route: Navigation.routes.automationForm
            },
            {
                name: 'NPS',
                icon: 'icon-mood',
                description:
                    'Configure as propriedades da criação da tarefa de NPS e defina o template da mensagem de whatsapp enviada nessa tarefa!',
                active: this.config?.enableNPS ?? false,
                id: 'enableNPS',
                tab: 'nps',
                routeParam: 'nps',
                route: Navigation.routes.automationForm
            },
            {
                name: 'Aniversário',
                icon: 'icon-cake',
                description: 'Configure a mensagem de whatsapp que será enviada nas tarefas de aniversário!',
                active: this.config?.enableBirthday ?? false,
                id: 'enableBirthday',
                tab: 'birthday',
                routeParam: 'birthday',
                route: Navigation.routes.automationForm
            },
            {
                name: 'Carrinho abandonado',
                icon: 'icon-shopping_cart',
                description:
                    'Configure as propriedades da criação da tarefa de carrinho abandonado e defina o template da mensagem de whatsapp enviada nessa tarefa!',
                active: this.config?.enableAbandonedCart ?? false,
                id: 'enableAbandonedCart',
                tab: 'abandoned_cart',
                routeParam: 'abandoned_cart',
                route: Navigation.routes.automationForm
            }
        ];
    }
}

interface ProviderCard {
    name: string;
    icon: string;
    description: string;
    active: boolean;
    id: string;
    tab: string;
    route: string;
    routeParam?: string;
    hideActive?: boolean;
    hidden?: boolean;
}
