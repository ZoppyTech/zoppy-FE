import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/user.util';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    public menuItems: SideMenuItem[] = [];
    public company: CompanyEntity | undefined = undefined;
    public user: UserEntity | undefined = undefined;

    public constructor(
        public publicService: PublicService,
        public sideMenuService: SideMenuService,
        public router: Router,
        public storage: Storage
    ) {
        this.sideMenuService.open = true;
    }

    public goToInitial(): void {
        this.router.navigate([Navigation.routes.dashboard]);
    }

    private setLoggedUser(): void {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
    }

    public setCompany(): void {
        this.company = this.storage.getCompany() as CompanyEntity;
    }

    public ngOnInit() {
        this.setLoggedUser();
        this.setCompany();
        this.menuItems = [
            {
                id: `home`,
                icon: 'icon-home',
                label: 'Início',
                route: Navigation.routes.home,
                visible: true
            },
            {
                id: `reports`,
                icon: 'icon-inventory',
                label: 'Relatórios',
                route: `${Navigation.routes.reports}/1`,
                visible: true
            },
            {
                id: `whatsapp`,
                icon: 'icon-wpp',
                label: 'Whatsapp',
                route: Navigation.routes.whatsapp,
                visible: true
            },
            {
                id: `products`,
                icon: 'icon-inventory_2',
                label: 'Cadastro de produtos',
                route: Navigation.routes.products,
                visible: true
            },
            {
                id: `registerSale`,
                icon: 'icon-shopping_cart',
                label: 'Lançamento de venda',
                route: Navigation.routes.sales,
                visible: true
            },
            {
                id: `customers`,
                icon: 'icon-group_add',
                label: 'Área de membros',
                route: Navigation.routes.customers,
                visible: true
            },
            {
                id: `configurations`,
                icon: 'icon-tune',
                label: 'Configurações',
                route: null,
                visible: true,
                class: 'mobile',
                subItems: [
                    {
                        id: `accessKeys`,
                        icon: 'icon-arrow',
                        label: 'Chaves de Acesso',
                        route: Navigation.routes.accessKeys,
                        visible: true
                    },
                    {
                        id: `accessTokens`,
                        icon: 'icon-arrow',
                        label: 'Tokens de Acesso',
                        route: Navigation.routes.accessTokens,
                        visible: true
                    },
                    {
                        id: `syncData`,
                        icon: 'icon-arrow',
                        label: 'Sincronizacão',
                        route: Navigation.routes.syncData,
                        visible: true
                    },
                    {
                        id: `giftback`,
                        icon: 'icon-arrow',
                        label: 'Configuração de Giftback',
                        route: Navigation.routes.giftback,
                        visible: true
                    },
                    {
                        id: `letalk`,
                        icon: 'icon-arrow',
                        label: 'Configuração da Letalk',
                        route: Navigation.routes.letalk,
                        visible: CompanyUtil.isStandard(this.company)
                    },
                    {
                        id: `whatsappConfig`,
                        icon: 'icon-arrow',
                        label: 'Whatsapp',
                        route: Navigation.routes.whatsappConfig,
                        visible: UserUtil.isMaster(this.user)
                    }
                ]
            },
            {
                id: `myCompany`,
                icon: 'icon-location_away',
                label: 'Minha empresa',
                route: null,
                visible: true,
                class: 'mobile',
                subItems: [
                    {
                        id: `myCompanyConfig`,
                        icon: 'icon-arrow',
                        label: 'Dados',
                        route: '/dashboard/my-company/config',
                        visible: true
                    },
                    {
                        id: `myCompanyUsers`,
                        icon: 'icon-arrow',
                        label: 'Usuários',
                        route: '/dashboard/my-company/users',
                        visible: true
                    },
                    {
                        id: `whatsappConfig`,
                        icon: 'icon-arrow',
                        label: 'Whatsapp',
                        route: '/dashboard/configurations/whatsapp',
                        visible: UserUtil.isMaster(this.user)
                    }
                ]
            }
        ];
    }

    public itemClicked(event: MouseEvent, item: SideMenuItem): void {
        event.stopPropagation();
        if (item.route && window.screen.width < 576) {
            this.sideMenuService.open = false;
        }
    }
}
