import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { StringUtil, FileUtils } from '@ZoppyTech/utilities';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { ZoppyFilter } from 'src/shared/models/filter';
import { CrmAddressResponse } from 'src/shared/models/responses/crm/crm-address.response';
import { CrmCustomerDetailResponse, CrmCustomerResponse } from 'src/shared/models/responses/crm/crm-customer.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmAddressService } from 'src/shared/services/crm-address/crm-address.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { DownloadService } from 'src/shared/services/download/download.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../dashboard.base.page';
import { ViewCustomerEntity } from 'src/shared/models/entities/view-customer.entity';
import { ViewCustomerService } from 'src/shared/services/view-customer/view-customer.service';

@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent extends DashboardBasePage implements OnInit {
    public loading: boolean = false;
    public loadingData: boolean = true;
    public customers: Array<ViewCustomerEntity> = [];
    public filter: ZoppyFilter<ViewCustomerEntity> = new ZoppyFilter<ViewCustomerEntity>();
    public customerDetail: ViewCustomerEntity | undefined = undefined;

    public constructor(
        public override storage: Storage,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public toast: ToastService,
        public router: Router,
        public viewCustomerService: ViewCustomerService,
        public crmCustomerService: CrmCustomerService,
        public downloadService: DownloadService,
        public confirmActionService: ConfirmActionService
    ) {
        super(storage);
    }

    @ViewChild('inputFile') public input: any;

    public async ngOnInit() {
        this.filter.searchFields = ['fullName', 'email', 'phone'];
        this.filter.orderBy = [
            {
                property: 'firstName',
                direction: 'ASC'
            }
        ];
        this.sideMenuService.change('customers');
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            this.loadingData = true;
            const response: ZoppyFilter<ViewCustomerEntity> = await this.viewCustomerService.findAllPaginated(this.filter);
            this.filter.pagination = response.pagination;
            this.customers = (response.data as ViewCustomerEntity[]) ?? [];
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        } finally {
            this.loadingData = false;
        }
    }

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        this.filter.pagination.page = 1;
        this.filter.searchText = searchText;
        await this.fetchData();
    }

    public async onSearchCustomerDetail(searchText: string = ''): Promise<void> {
        this.customerDetail = undefined;
        searchText = StringUtil.onlyNumbers(searchText);
        if (searchText.length !== 11) {
            this.toast.error('Corrija o formato do telefone, deve ser DDD e número', 'Telefone inválido', 5);
            return;
        }

        try {
            this.customerDetail = await this.viewCustomerService.findByPhone(searchText);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
            this.customerDetail = undefined;
        }
    }

    public add(): void {
        this.router.navigate([Navigation.routes.customer]);
    }

    public async onPaginationChanged(page: number): Promise<void> {
        this.filter.pagination.page = page;
        await this.fetchData();
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
        try {
            const file: any = await this.downloadService.downloadPublicFile(path, fileName, type);
            FileUtils.downloadBlob(fileName, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        }
    }

    public async redirectToChat(): Promise<void> {
        this.router.navigate([Navigation.routes.whatsapp]);
    }

    public async remove(address: CrmAddressResponse): Promise<void> {
        this.confirmActionService.open(
            'Deletar o cliente',
            'Tem certeza que deseja deletar esse cliente? Essa ação nao poderá ser desfeita.',
            async (result: boolean) => {
                if (!result) return;
                try {
                    await this.crmCustomerService.destroy(address.customerId as string);
                    await this.fetchData();
                    this.toast.success('Esse cliente foi removido e não pode ser mais usado', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível deletar esse cliente');
                }
            }
        );
    }

    public async update(customer: ViewCustomerEntity): Promise<void> {
        this.router.navigate([Navigation.routes.customers, customer.id]);
    }

    public async details(customer: ViewCustomerEntity): Promise<void> {
        this.router.navigate([Navigation.routes.customerSocialMedia, customer.id]);
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
