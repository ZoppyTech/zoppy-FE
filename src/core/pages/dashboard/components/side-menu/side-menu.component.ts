import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    public open: boolean = false;
    public menuItems: SideMenuItem[] = [];
    public constructor(public publicService: PublicService, public sideMenuService: SideMenuService) {}

    public ngOnInit() {
        this.menuItems = [
            {
                id: `reports`,
                icon: 'icon-inventory',
                label: 'Relatórios',
                route: '/dashboard/reports'
            },
            {
                id: `my-company`,
                icon: 'icon-group',
                label: 'Usuários',
                route: '/dashboard/my-company'
            },
            {
                id: `configurations`,
                icon: 'icon-tune',
                label: 'Configurações',
                route: '/dashboard/configurations',
                subItems: [
                    {
                        id: `access-keys`,
                        icon: 'icon-arrow',
                        label: 'Chaves de Acesso',
                        route: '/dashboard/configurations/access-keys'
                    },
                    {
                        id: `access-tokens`,
                        icon: 'icon-arrow',
                        label: 'Tokens de Acesso',
                        route: '/dashboard/configurations/access-tokens'
                    },
                    {
                        id: `sync-data`,
                        icon: 'icon-arrow',
                        label: 'Sincronizacão',
                        route: '/dashboard/configurations/sync-data'
                    },
                    {
                        id: `giftback`,
                        icon: 'icon-arrow',
                        label: 'Configuração de Giftback',
                        route: '/dashboard/configurations/giftback'
                    }
                ]
            }
        ];
    }
}
