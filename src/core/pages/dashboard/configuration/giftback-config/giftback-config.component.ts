import { Component, OnInit } from '@angular/core';
import { GiftbackRequest } from 'src/shared/models/requests/giftback/giftback.request';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-giftback-config',
    templateUrl: './giftback-config.component.html',
    styleUrls: ['./giftback-config.component.scss']
})
export class GiftbackConfigComponent implements OnInit {
    public giftback: GiftbackRequest = new GiftbackRequest();

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
                name: `Configuração de Giftback`,
                route: `/dashboard/configurations/giftback`
            }
        ];
        this.sideMenuService.changeSub(`giftback`);
    }

    public save() {
        console.log(`saved`);
    }

    public getSaveDisabled(): boolean {
        return !this.giftback.maxPercentValue || !this.giftback.percentValue || !this.giftback.expirationDays;
    }
}
