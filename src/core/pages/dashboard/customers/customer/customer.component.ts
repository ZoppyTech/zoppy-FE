import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { CrmCustomerRequest } from 'src/shared/models/requests/crm/crm-customer.request';
import { ZipcodeResponse } from 'src/shared/models/responses/zipcode/zipcode.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { ViewCustomerService } from 'src/shared/services/view-customer/view-customer.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-customer',
    templateUrl: './customer.component.html',
    styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
    public genders: Item[] = [
        {
            label: 'Masculino',
            value: 'M'
        },
        {
            label: 'Feminino',
            value: 'F'
        }
    ];
    public loading: boolean = false;
    public loaded: boolean = false;
    public id: string = '';
    public customer: ViewCustomerEntity = new ViewCustomerEntity();

    public constructor(
        public breadcrumb: BreadcrumbService,
        public sideMenuService: SideMenuService,
        private readonly crmCustomerService: CrmCustomerService,
        private readonly viewCustomerService: ViewCustomerService,
        private readonly publicService: PublicService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toast: ToastService
    ) {}

    public async ngOnInit() {
        this.sideMenuService.change('customers');
        this.id = this.route.snapshot.paramMap.get('id') ?? '';
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        if (!this.id) {
            this.loaded = true;
            return;
        }
        try {
            const customer: ViewCustomerEntity = await this.viewCustomerService.findById(this.id);
            if (customer) this.customer = customer;
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter as informações');
        } finally {
            this.loaded = true;
        }
    }

    public async save(): Promise<void> {
        this.loading = true;
        try {
            const request: CrmCustomerRequest = {
                id: this.id,
                billingId: this.customer.addressId,
                firstName: this.customer.firstName,
                lastName: this.customer.lastName,
                companyName: '',
                address1: this.customer.address1,
                address2: this.customer.address2,
                city: this.customer.city,
                state: this.customer.state,
                postcode: this.customer.postcode,
                country: this.customer.country,
                email: this.customer.email,
                phone: this.customer.phone,
                birthDate: this.customer.birthDate,
                gender: this.customer.gender,
                block: this.customer.block
            };

            this.id ? await this.crmCustomerService.update(this.id, request) : await this.crmCustomerService.create(request);
            this.toast.success('Sucesso', 'Informações atualizadas');
            this.router.navigate([Navigation.routes.customers]);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    public async fetchZipcode(zipcode: string) {
        if (zipcode.length !== 8) {
            this.customer.postcode = '';
            this.toast.error('Cep no formato incorreto', 'Corrija o formato do CEP');
            return;
        }

        try {
            this.loaded = false;
            const zipcodeResponse: ZipcodeResponse = await this.publicService.fetchZipcode(zipcode);
            if (zipcodeResponse && zipcodeResponse.cep) {
                this.customer.address1 = `${zipcodeResponse.logradouro}`;
                this.customer.address2 = zipcodeResponse.bairro;
                this.customer.city = zipcodeResponse.localidade;
                this.customer.state = zipcodeResponse.uf;
                this.toast.success(`Contato carregado!`, `Sucesso!`);
            } else {
                this.toast.error(`Preencha as informações do CEP`, `CEP não encontrado!`);
            }
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter as informações do CEP');
        } finally {
            this.loaded = true;
        }
    }

    public getDisabled(): boolean {
        return !this.customer.lastName || !this.customer.firstName || !this.customer.phone;
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Área de membros`,
                route: Navigation.routes.customers
            },
            {
                name: this.id ? `Editar Cliente` : 'Criar Cliente',
                route: Navigation.routes.customers
            }
        ];
    }
}

interface Item {
    label: string;
    value: string | null;
}
