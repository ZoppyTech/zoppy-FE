import { Component, OnInit } from '@angular/core';
import { ExternalTokenRequest } from 'src/shared/models/requests/external-token/external-token.request';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-access-tokens',
    templateUrl: './access-tokens.component.html',
    styleUrls: ['./access-tokens.component.scss']
})
export class AccessTokensComponent implements OnInit {
    public tokens: Array<ExternalTokenRequest> = [
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        },
        {
            hash: ``,
            active: false
        }
    ];

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
                route: `/dashboard/configurations/access-tokens`
            }
        ];
        this.sideMenuService.changeSub(`access-tokens`);
    }
}
