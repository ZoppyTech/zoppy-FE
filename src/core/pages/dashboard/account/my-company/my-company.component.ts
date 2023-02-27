import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService, public storage: Storage) {}

    public ngOnInit() {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Minha empresa`,
                route: undefined
            }
        ];
        this.sideMenuService.change(`none`);
        this.sideMenuService.changeSubAccount(`myCompany`);
    }
}
