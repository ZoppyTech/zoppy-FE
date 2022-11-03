import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-register-sales',
    templateUrl: './register-sales.component.html',
    styleUrls: ['./register-sales.component.scss']
})
export class RegisterSalesComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService, public storage: Storage) {}

    public ngOnInit() {
        this.sideMenuService.change('register-sale');
        this.setBreadcrumb();
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Lançamento de venda`,
                route: undefined
            }
        ];
    }
}
