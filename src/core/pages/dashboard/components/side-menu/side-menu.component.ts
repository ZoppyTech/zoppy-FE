import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    public menuItems: SideMenuItem[] = [];
    public company: CompanyEntity | undefined = undefined;
    public constructor(
        public publicService: PublicService,
        public sideMenuService: SideMenuService,
        public router: Router,
        public storage: Storage
    ) {}

    public goToInitial(): void {
        this.router.navigate([Navigation.routes.dashboard]);
    }

    public ngOnInit() {
        this.company = this.storage.getCompany() as CompanyEntity;
        this.menuItems = [
            {
                id: `home`,
                icon: 'icon-home',
                label: 'Início',
                route: '/dashboard/home',
                visible: true
            },
            {
                id: `reports`,
                icon: 'icon-inventory',
                label: 'Relatórios',
                route: '/dashboard/reports',
                visible: true
            },
            {
                id: `my-company`,
                icon: 'icon-location_away',
                label: 'Minha empresa',
                route: null,
                visible: true,
                subItems: [
                    {
                        id: `my-company-config`,
                        icon: 'icon-arrow',
                        label: 'Dados',
                        route: '/dashboard/my-company/config',
                        visible: true
                    },
                    {
                        id: `my-company-users`,
                        icon: 'icon-arrow',
                        label: 'Usuários',
                        route: '/dashboard/my-company/users',
                        visible: true
                    }
                ]
            },
            {
                id: `whatsapp`,
                icon: 'icon-wpp',
                label: 'Whatsapp',
                route: '/dashboard/whatsapp',
                visible: CompanyUtil.isPremium(this.company)
            },
            {
                id: `configurations`,
                icon: 'icon-tune',
                label: 'Configurações',
                route: null,
                visible: true,
                subItems: [
                    {
                        id: `access-keys`,
                        icon: 'icon-arrow',
                        label: 'Chaves de Acesso',
                        route: '/dashboard/configurations/access-keys',
                        visible: true
                    },
                    {
                        id: `access-tokens`,
                        icon: 'icon-arrow',
                        label: 'Tokens de Acesso',
                        route: '/dashboard/configurations/access-tokens',
                        visible: true
                    },
                    {
                        id: `sync-data`,
                        icon: 'icon-arrow',
                        label: 'Sincronizacão',
                        route: '/dashboard/configurations/sync-data',
                        visible: true
                    },
                    {
                        id: `giftback`,
                        icon: 'icon-arrow',
                        label: 'Configuração de Giftback',
                        route: '/dashboard/configurations/giftback',
                        visible: true
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
