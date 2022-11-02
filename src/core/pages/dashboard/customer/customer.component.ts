import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    public constructor(
        private readonly toast: ToastService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService
    ) {}

    public ngOnInit(): void {
        this.setBreadcrumb();
        this.sideMenuService.change('configurations');
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Cadastro de clientes`,
                route: undefined
            }
        ];
    }
}
