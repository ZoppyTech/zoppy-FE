import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { CrmAddressResponse } from 'src/shared/models/responses/crm/crm-address.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmAddressService } from 'src/shared/services/crm-address/crm-address.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit {
    public loading: boolean = false;
    public customers: Array<CrmAddressResponse> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public modal: ModalService,
        public toast: ToastService,
        public crmAddressService: CrmAddressService,
        public crmCustomerService: CrmCustomerService,
        public publicService: PublicService
    ) {}

    @ViewChild('inputFile') public input: any;

    public async ngOnInit() {
        this.sideMenuService.change('customers');
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            const response: Array<CrmAddressResponse> = await this.crmAddressService.findAll();
            this.customers = response;
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        }
    }

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Cadastro de clientes',
            button: 'Entendi',
            description: `IMPORTANTE! Após enviar a planilha com seus clientes, você não poderá editar ou apagá-los. Para cadastrar novos clientes, baixe novamente a planilha e insira <b>somente</b> aqueles que ainda não foram enviados. Se inserir clientes que já foram cadastrados, eles ficarão duplicados na plataforma.`
        });
    }

    public async save(): Promise<void> {
        if (!this.input) return;
        this.input.nativeElement.click();
    }

    public async handleFileInput(event: any) {
        this.loading = true;
        try {
            const file: any = event.target.files[0];
            await this.crmCustomerService.upload(file);
            this.toast.success('Seus clientes foram adicionados com sucesso!', 'Sucesso!');
            await this.fetchData();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus clientes');
        } finally {
            this.loading = false;
        }
    }

    public async download(): Promise<void> {
        const fileName: string = 'Zoppy Clientes.csv';
        const type: string = 'text/csv';
        const path: string = '/docs/import_customers_zoppy.csv';
        this.publicService.downloadPublicFile(path, fileName, type).subscribe((response: any) => {
            const a: any = document.createElement('a');
            a.href = 'data:text/csv,' + response;
            a.setAttribute('download', fileName);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        });
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Cadastro de clientes`,
                route: undefined
            }
        ];
    }
}
