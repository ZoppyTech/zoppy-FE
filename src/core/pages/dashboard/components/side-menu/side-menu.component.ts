import { Component, OnInit } from '@angular/core';
import { PublicService } from 'src/shared/services/public/public.service';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    public open: boolean = false;
    public menuItems: MenuItem[] = [];
    public constructor(public publicService: PublicService) {}

    public ngOnInit() {
        this.menuItems = [
            {
                icon: 'icon-inventory',
                label: 'Relatórios',
                route: '/dashboard/reports'
            },
            {
                icon: 'icon-group',
                label: 'Usuários',
                route: '/dashboard/my-company'
            },
            {
                icon: 'icon-tune',
                label: 'Configurações',
                route: '/dashboard/configuration'
            }
        ];
    }
}

interface MenuItem {
    icon: string;
    label: string;
    route: string;
}
