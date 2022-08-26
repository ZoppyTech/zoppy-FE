import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-side-menu',
    templateUrl: './side-menu.component.html',
    styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
    public open: boolean = false;
    public menuItems: MenuItem[] = [];
    public constructor() {}

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
