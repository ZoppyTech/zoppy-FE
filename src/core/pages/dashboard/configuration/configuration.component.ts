import { Component, OnInit } from '@angular/core';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuItem, SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { UserUtil } from 'src/shared/utils/user.util';
import { ConfigSubItems } from '../components/config.subitems';

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
        this.menuItems = ConfigSubItems.get(this.user as UserEntity, this.company as CompanyEntity);
    }
}
