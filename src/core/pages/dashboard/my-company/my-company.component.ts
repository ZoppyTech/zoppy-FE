import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService) {}

    public ngOnInit() {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Meus usuários`,
                route: `/dashboard/my-company`
            }
        ];
        this.sideMenuService.change(`my-company`);
    }
}
