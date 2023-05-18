import { Component, OnInit } from '@angular/core';
import { DashboardBasePage } from '../../dashboard.base.page';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';
import { Navigation } from 'src/shared/utils/navigation';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';
import { WcKeyEntity } from 'src/shared/models/entities/wc-key.entity';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { AppConstants } from '@ZoppyTech/utilities';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';

@Component({
    selector: 'app-integration',
    templateUrl: './integration.component.html',
    styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent extends DashboardBasePage implements OnInit {
    public providers: ProviderCard[] = [];
    public key: WcKeyEntity = new WcKeyEntity();
    public loading?: boolean = true;
    public provider: string = '';
    public open: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService,
        private readonly keyService: WcKeyService
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.setBreadcrumbItems();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`integrations`);
        this.key = await this.keyService.find();
        this.company = this.storage.getCompany() as CompanyEntity;
        this.setProviders();
        this.loading = false;
        this.initEvents();
    }

    public select(card: ProviderCard): void {
        this.provider = card.provider;
        setTimeout(() => {
            this.open = true;
        });
    }

    public isSupportProvider(): boolean {
        return [AppConstants.PROVIDERS.NUVEMSHOP, AppConstants.PROVIDERS.SHOPIFY, AppConstants.PROVIDERS.WHATSAPP].includes(this.provider);
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
                name: `Integrações`,
                route: Navigation.routes.integrations
            }
        ];
    }

    private setProviders(): void {
        this.providers = [
            {
                name: 'Tray',
                image: './assets/svg/tray_mini.svg',
                description: 'Possui loja na Tray? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.TRAY && this.key?.id),
                provider: AppConstants.PROVIDERS.TRAY
            },
            {
                name: 'Shopify',
                image: './assets/svg/shopify_mini.svg',
                description: 'Possui loja na Shopify? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.SHOPIFY && this.key?.id),
                provider: AppConstants.PROVIDERS.SHOPIFY
            },
            {
                name: 'Yampi',
                image: './assets/svg/yampi_mini.svg',
                description: 'Possui loja na Yampi? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.YAMPI && this.key?.id),
                provider: AppConstants.PROVIDERS.YAMPI
            },
            {
                name: 'Dooca Commerce',
                image: './assets/svg/dooca_mini.svg',
                description: 'Possui loja Dooca? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.DOOCA && this.key?.id),
                provider: AppConstants.PROVIDERS.DOOCA
            },
            {
                name: 'Nuvemshop',
                image: './assets/svg/nuvemshop_mini.svg',
                description: 'Possui loja na Nuvemshop? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.NUVEMSHOP && this.key?.id),
                provider: AppConstants.PROVIDERS.NUVEMSHOP
            },
            {
                name: 'WooCommerce',
                image: './assets/svg/woo_commerce_mini.svg',
                description: 'Possui loja na WooCommerce? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.WOO_COMMERCE && this.key?.id),
                provider: AppConstants.PROVIDERS.WOO_COMMERCE
            },
            {
                name: 'Bagy',
                image: './assets/svg/bagy_mini.svg',
                description: 'Possui loja na Bagy? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === 'bagy' && this.key?.id),
                provider: AppConstants.PROVIDERS.BAGY
            },
            {
                name: 'OneChat',
                image: '',
                description: 'Possui loja na OneChat? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.ONE_CHAT && this.key?.id),
                provider: AppConstants.PROVIDERS.ONE_CHAT
            },
            {
                name: 'Movere',
                image: '',
                description: 'Possui loja na Movere? Faça a integração com a Zoppy agora mesmo!',
                active: !!(this.company?.provider === AppConstants.PROVIDERS.MOVERE && this.key?.id),
                provider: AppConstants.PROVIDERS.MOVERE
            },
            {
                name: 'Whatsapp Business',
                image: './assets/svg/wpp_mini.svg',
                description: 'Gostaria de configurar o Whatsapp Business? Faça a integração com a Zoppy agora mesmo!',
                active: this.company?.plan === AppConstants.PLANS.PREMIUM,
                provider: AppConstants.PROVIDERS.WHATSAPP,
                hidden: this.company?.provider === AppConstants.PROVIDERS.TRAY
            }
        ];
    }

    private initEvents(): void {
        BroadcastService.subscribe(this, 'reload-providers', async () => {
            await this.ngOnInit();
        });
    }
}

interface ProviderCard {
    name: string;
    image: string;
    description: string;
    active: boolean;
    provider: string;
    hidden?: boolean;
}
