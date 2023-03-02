import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants } from '@ZoppyTech/utilities';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/user.util';
import { ConfigSubItems } from '../config.subitems';

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
        if (window.screen.width > 576) this.sideMenuService.open = true;
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
                id: `reports`,
                icon: 'icon-inventory',
                label: 'Relatórios',
                route: `${Navigation.routes.reports}/1`,
                visible: UserUtil.hasRoles(this.user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MANAGER, AppConstants.ROLES.MASTER])
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
                id: `salesPanel`,
                icon: 'icon-assignment_turned_in',
                label: 'Painel do Vendedor',
                route: Navigation.routes.salesPanel,
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
                subItems: ConfigSubItems.get(this.user as UserEntity, this.company as CompanyEntity)
            },
            {
                id: `myCompany`,
                icon: 'icon-location_away',
                label: 'Minha empresa',
                route: null,
                visible: UserUtil.hasRoles(this.user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER]),
                class: 'mobile',
                subItems: [
                    {
                        id: `myCompanyConfig`,
                        icon: 'icon-arrow',
                        label: 'Dados',
                        route: '/dashboard/my-company/config',
                        visible: UserUtil.hasRoles(this.user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
                    },
                    {
                        id: `myCompanyUsers`,
                        icon: 'icon-arrow',
                        label: 'Usuários',
                        route: '/dashboard/my-company/users',
                        visible: UserUtil.hasRoles(this.user, [AppConstants.ROLES.ADMIN, AppConstants.ROLES.MASTER])
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

    public itemClicked(item: SideMenuItem): void {
        if (item.route && window.screen.width < 576) {
            this.sideMenuService.open = false;
        }
    }
}
