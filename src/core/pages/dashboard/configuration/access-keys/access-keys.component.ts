import { Component, OnInit } from '@angular/core';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-access-keys',
    templateUrl: './access-keys.component.html',
    styleUrls: ['./access-keys.component.scss']
})
export class AccessKeysComponent implements OnInit {
    public key: wcKeyRequest = new wcKeyRequest();

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

    public async save(): Promise<void> {
        console.log(`do nothing`);
    }

    public getSaveDisabled(): boolean {
        return !this.key.key || !this.key.secret || !this.key.url;
    }
}
