import { Component, OnInit } from '@angular/core';
import { DashboardBasePage } from '../../dashboard.base.page';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-integration',
    templateUrl: './integration.component.html',
    styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent extends DashboardBasePage implements OnInit {
    public providers: ProviderCard[] = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.setBreadcrumbItems();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`integrations`);
        this.setProviders();
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
                active: false
            },
            {
                name: 'Shopify',
                image: './assets/svg/shopify_mini.svg',
                description: 'Possui loja na Shopify? Faça a integração com a Zoppy agora mesmo!',
                active: false
            },
            {
                name: 'Yampi',
                image: './assets/svg/yampi_mini.svg',
                description: 'Possui loja na Yampi? Faça a integração com a Zoppy agora mesmo!',
                active: false
            },
            {
                name: 'Dooca Commerce',
                image: './assets/svg/dooca_mini.svg',
                description: 'Possui loja Dooca Tray? Faça a integração com a Zoppy agora mesmo!',
                active: false
            },
            {
                name: 'Nuvemshop',
                image: './assets/svg/nuvemshop_mini.svg',
                description: 'Possui loja na Nuvemshop? Faça a integração com a Zoppy agora mesmo!',
                active: false
            },
            {
                name: 'WooCommerce',
                image: './assets/svg/woo_commerce_mini.svg',
                description: 'Possui loja na WooCommerce? Faça a integração com a Zoppy agora mesmo!',
                active: false
            }
        ];
    }
}

interface ProviderCard {
    name: string;
    image: string;
    description: string;
    active: boolean;
}
