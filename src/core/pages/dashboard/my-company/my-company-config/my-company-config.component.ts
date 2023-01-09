import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { CompanyRequest } from 'src/shared/models/requests/company/company.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CompanyService } from 'src/shared/services/company/company.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-my-company-config',
    templateUrl: './my-company-config.component.html',
    styleUrls: ['./my-company-config.component.scss']
})
export class MyCompanyConfigComponent implements OnInit {
    public company: CompanyEntity = new CompanyEntity();
    public loading: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public companyService: CompanyService,
        public storage: Storage,
        public toast: ToastService
    ) {}

    public ngOnInit() {
        this.company = (this.storage.getCompany() as CompanyEntity) || new CompanyEntity();
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Minha empresa`,
                route: undefined
            },
            {
                name: `Dados`,
                route: Navigation.routes.myCompanyConfig
            }
        ];
        this.sideMenuService.change(`myCompany`);
        this.sideMenuService.changeSub(`myCompanyConfig`);
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: CompanyRequest = {
                id: this.company.id,
                name: this.company.name,
                phone: this.company.phone,
                revenueRecord: this.company.revenueRecord,
                email: this.company.email
            };
            const company: CompanyEntity = await this.companyService.update(request);
            this.storage.setCompany(company);
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }
}
