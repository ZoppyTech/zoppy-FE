import { Component, OnInit } from '@angular/core';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
    public menuItems: SideMenuItem[] = [];
    public company: CompanyEntity | undefined = undefined;

    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService, public storage: Storage) {}

    public ngOnInit() {
        this.company = this.storage.getCompany() as CompanyEntity;
        setTimeout(() => {
            this.sideMenuService.change(`configurations`);
            this.setBreadcrumb();
            this.setMenuItems();
        });
    }

    private setBreadcrumb(): void {
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

    private setMenuItems(): void {
        this.menuItems = [
            {
                id: `accessKeys`,
                icon: 'icon-arrow',
                label: 'Chaves de Acesso',
                route: Navigation.routes.accessKeys,
                visible: true
            },
            {
                id: `accessTokens`,
                icon: 'icon-arrow',
                label: 'Tokens de Acesso',
                route: Navigation.routes.accessTokens,
                visible: true
            },
            {
                id: `syncData`,
                icon: 'icon-arrow',
                label: 'Sincronizacão',
                route: Navigation.routes.syncData,
                visible: true
            },
            {
                id: `giftback`,
                icon: 'icon-arrow',
                label: 'Configuração de Giftback',
                route: Navigation.routes.giftback,
                visible: true
            },
            {
                id: `whatsappConfig`,
                icon: 'icon-arrow',
                label: 'Configuração do Whatsapp',
                route: Navigation.routes.whatsappConfig,
                visible: CompanyUtil.isPremium(this.company)
            },
            {
                id: `whatsappTemplateList`,
                icon: 'icon-arrow',
                label: 'Modelos de Mensagem Whatsapp',
                route: Navigation.routes.whatsappTemplateList,
                visible: CompanyUtil.isPremium(this.company)
            },
            {
                id: `letalk`,
                icon: 'icon-arrow',
                label: 'Configuração da Letalk',
                route: Navigation.routes.letalk,
                visible: CompanyUtil.isStandard(this.company)
            }
        ];
    }
}
