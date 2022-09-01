import { Component, OnInit } from '@angular/core';
import { ToastService } from '@lucarrloliveira/toast';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { CompanyRequest } from 'src/shared/models/requests/company/company.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CompanyService } from 'src/shared/services/company/company.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
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
        this.company = this.storage.getCompany() as CompanyEntity;
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Minha empresa`,
                route: `/dashboard/my-company`
            }
        ];
        this.sideMenuService.change(`my-company`);
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
            await this.companyService.update(request);
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvas as informações');
        } finally {
            this.loading = false;
        }
    }
}
