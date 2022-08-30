import { Component, OnInit } from '@angular/core';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService) {
        console.log(`entrou aqui??`);
    }

    public ngOnInit() {
        this.sideMenuService.change(`configurations`);
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Configuracões`,
                route: undefined
            }
        ];
    }
}
