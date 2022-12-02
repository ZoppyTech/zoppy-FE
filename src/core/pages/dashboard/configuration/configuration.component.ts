import { Component, OnInit } from '@angular/core';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/user.util';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
    public menuItems: SideMenuItem[] = [];
    public company: CompanyEntity | undefined = undefined;
    public user: UserEntity | undefined = undefined;

    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService, public storage: Storage) {}

    public ngOnInit() {
        this.setLoggedUser();
        this.setCompany();
        setTimeout(() => {
            this.sideMenuService.change(`configurations`);
            this.setBreadcrumb();
            this.setMenuItems();
        });
    }

    private setLoggedUser(): void {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
    }

    public setCompany(): void {
        this.company = this.storage.getCompany() as CompanyEntity;
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Configurações`,
                route: undefined
            }
        ];
    }

    private setMenuItems(): void {
        this.menuItems = [
            {
                id: `accessTokens`,
                icon: 'icon-arrow',
                label: 'Tokens de Acesso',
                route: Navigation.routes.accessTokens,
                visible: true
            },
            {
                id: `accessKeys`,
                icon: 'icon-arrow',
                label: 'Chaves de Acesso',
                route: Navigation.routes.accessKeys,
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
                id: `syncData`,
                icon: 'icon-arrow',
                label: 'Sincronização',
                route: Navigation.routes.syncData,
                visible: true
            },
            {
                id: `whatsappConfig`,
                icon: 'icon-arrow',
                label: 'Configuração do Whatsapp',
                route: Navigation.routes.whatsappConfig,
                visible: UserUtil.isMaster(this.user)
            },
            {
                id: `whatsappTemplateList`,
                icon: 'icon-arrow',
                label: 'Modelos de Mensagem Whatsapp',
                route: Navigation.routes.whatsappTemplateList,
                visible: UserUtil.isMaster(this.user)
            },
            {
                id: `letalk`,
                icon: 'icon-arrow',
                label: 'Configuração da Letalk',
                route: Navigation.routes.letalk,
                visible: CompanyUtil.isStandard(this.company)
            },
            {
                id: `messageConfig`,
                icon: 'icon-arrow',
                label: 'Configuração de mensagens',
                route: Navigation.routes.messageConfig,
                visible: true
            },
            {
                id: `coupons`,
                icon: 'icon-arrow',
                label: 'Visualização de giftbacks',
                route: Navigation.routes.coupons,
                visible: UserUtil.isMaster(this.user)
            },
            {
                id: `batchUpload`,
                icon: 'icon-arrow',
                label: 'Upload de dados por planilha',
                route: Navigation.routes.batchUpload,
                visible: UserUtil.isMaster(this.user)
            }
        ];
    }
}
