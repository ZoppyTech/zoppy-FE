import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-sync-data',
    templateUrl: './sync-data.component.html',
    styleUrls: ['./sync-data.component.scss']
})
export class SyncDataComponent implements OnInit {
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
                name: `Sincronização`,
                route: `/dashboard/configurations/sync-data`
            }
        ];
        this.sideMenuService.changeSub(`sync-data`);
    }
}