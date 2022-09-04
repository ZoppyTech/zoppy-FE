import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
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
                icon: 'icon-location_away',
                label: 'Minha empresa',
                route: '/dashboard/my-company'
            },
            {
                id: `configurations`,
                icon: 'icon-tune',
                label: 'Configurações',
                route: null,
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

    public itemClicked(item: SideMenuItem): void {
        if (item.route && window.screen.width < 576) {
            console.log('asd');
            this.sideMenuService.open = false;
        }
    }
}
