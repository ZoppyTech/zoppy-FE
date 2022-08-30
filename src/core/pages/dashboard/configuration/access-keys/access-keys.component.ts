import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-access-keys',
    templateUrl: './access-keys.component.html',
    styleUrls: ['./access-keys.component.scss']
})
export class AccessKeysComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService) {}

    public ngOnInit() {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Tokens de Acesso`,
                route: `/dashboard/configurations/access-keys`
            }
        ];
        this.sideMenuService.changeSub(`access-keys`);
    }
}