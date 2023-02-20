import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { FileUtils } from '@ZoppyTech/utilities';
import { debug } from 'console';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCouponService } from 'src/shared/services/crm-coupon/crm-coupon.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { CrmLineItemService } from 'src/shared/services/crm-line-item/crm-line-item.service';
import { CrmOrderService } from 'src/shared/services/crm-order/crm-order.service';
import { CrmProductService } from 'src/shared/services/crm-product/crm-product.service';
import { DownloadService } from 'src/shared/services/download/download.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { SyncDataService } from 'src/shared/services/wc-sync/sync-data.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-batch-upload-orders',
    templateUrl: './batch-upload-orders.component.html',
    styleUrls: ['./batch-upload-orders.component.scss']
})
export class BatchUploadOrdersComponent implements OnInit, AfterViewInit {
    @ViewChild('inputFileProduct') public inputFileProduct: any;
    @ViewChild('inputFileCustomer') public inputFileCustomer: any;
    @ViewChild('inputFileCoupon') public inputFileCoupon: any;
    @ViewChild('inputFileOrder') public inputFileOrder: any;
    @ViewChild('inputFileOrderProduct') public inputFileOrderProduct: any;

    public loadingClean: boolean = false;
    public cards: Array<Card> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private readonly downloadService: DownloadService,
        private readonly crmCustomerService: CrmCustomerService,
        private readonly crmOrderService: CrmOrderService,
        private readonly crmLineItemService: CrmLineItemService,
        private readonly crmCouponService: CrmCouponService,
        private readonly crmProductService: CrmProductService,
        private readonly syncDataService: SyncDataService,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService
    ) {}

    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.initializeCards();
        });
    }

    public ngOnInit(): void {
        this.sideMenuService.changeSub(`batchUpload`);
        this.sideMenuService.change('configurations');
        this.generateBreadcrumb();
    }

    public async clean(): Promise<void> {
        this.confirmAction.open(
            'Apagar todos os dados',
            'Tem certeza que deseja deletar todos os dados dessa Empresa? Caso tenha integraçao com qualquer E-commerce a importação de dados deverá ser refeita',
            async (result: boolean) => {
                if (!result) return;
                try {
                    this.loadingClean = true;
                    await this.syncDataService.clean();
                    this.toast.success('Dados removidos com sucesso', 'Remoção concluída!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Erro!');
                } finally {
                    this.loadingClean = false;
                }
            }
        );
    }

    public removeFile(card: Card): void {
        card.file = null;
        card.fileName = '';
    }

    public async download(card: Card): Promise<void> {
        const type: string = 'text/csv';
        try {
            card.loading = true;
            const file: any = await card.downloadService.downloadPublicFile(card.path, card.fileName, type);
            FileUtils.downloadBlob(card.fileName, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            card.loading = false;
        }
    }

    public handleFileUpload(event: any, id: CardId): void {
        const file: any = event.target.files[0];
        this.cards.forEach((card: Card) => {
            if (card.id === id) {
                card.file = file;
                card.uploadedFileName = file.name;
            }
        });
    }

    public upload(card: Card): void {
        if (!card.input) return;
        card.input.nativeElement.click();
    }

    public async execute(card: Card): Promise<void> {
        switch (card.id) {
            case 'customers':
                await this.uploadCustomers(card);
                break;
            case 'products':
                await this.uploadProducts(card);
                break;
            case 'coupons':
                await this.uploadCoupons(card);
                break;
            case 'order-products':
                await this.uploadLineItems(card);
                break;
            case 'orders':
                await this.uploadOrders(card);
                break;
        }
    }

    public async uploadOrders(card: Card) {
        card.uploading = true;

        card.loading = true;
        try {
            await this.crmOrderService.upload(card.file);
            this.toast.success('Seus pedidos foram adicionados com sucesso!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus pedidos');
        } finally {
            card.uploading = false;
        }
    }

    public async uploadLineItems(card: Card) {
        card.uploading = true;

        try {
            await this.crmLineItemService.upload(card.file);
            this.toast.success('Seus produtos dos pedidos foram adicionados com sucesso!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus produtos dos pedidos');
        } finally {
            card.uploading = false;
        }
    }

    public async uploadCoupons(card: Card) {
        card.uploading = true;

        try {
            await this.crmCouponService.upload(card.file);
            this.toast.success('Seus coupons foram adicionados com sucesso!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus coupons');
        } finally {
            card.uploading = false;
        }
    }

    public async uploadCustomers(card: Card) {
        card.uploading = true;
        try {
            await this.crmCustomerService.upload(card.file);
            this.toast.success('Seus clientes foram adicionados com sucesso!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus clientes');
        } finally {
            card.uploading = false;
        }
    }

    public async uploadProducts(card: Card) {
        card.uploading = true;
        try {
            await this.crmProductService.upload(card.file);
            this.toast.success('Seus produtos foram adicionados com sucesso!', 'Sucesso!');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus produtos');
        } finally {
            card.uploading = false;
        }
    }

    public initializeCards(): void {
        this.cards = [
            {
                id: 'customers',
                title: 'Cliente'.toUpperCase(),
                description:
                    'Use a planilha base Zoppy_Clientes.csv para importar os novos clientes, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Clientes.csv',
                path: '/docs/import_customers_zoppy.csv',
                input: this.inputFileCustomer,
                downloadService: this.downloadService
            },
            {
                id: 'coupons',
                title: 'Coupons'.toUpperCase(),
                description: 'Use a planilha base Zoppy_Coupons.csv para importar os novos coupons, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Coupons.csv',
                path: '/docs/import_coupons_zoppy.csv',
                input: this.inputFileCoupon,
                downloadService: this.downloadService
            },
            {
                id: 'products',
                title: 'Produtos'.toUpperCase(),
                description:
                    'Use a planilha base Zoppy_Produtos.csv para importar os novos produtos, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Produtos.csv',
                path: '/docs/import_products_zoppy.csv',
                input: this.inputFileProduct,
                downloadService: this.downloadService
            },
            {
                id: 'orders',
                title: 'Pedidos'.toUpperCase(),
                description: 'Use a planilha base Zoppy_Pedidos.csv para importar os novos pedidos, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Pedidos.csv',
                path: '/docs/import_orders_zoppy.csv',
                input: this.inputFileOrder,
                downloadService: this.downloadService
            },
            {
                id: 'order-products',
                title: 'Produtos dos pedidos'.toUpperCase(),
                description:
                    'Use a planilha base Zoppy_Produtos_dos_Pedidos.csv para importar os novos produtos dos pedidos, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Produtos_dos_Pedidos.csv',
                path: '/docs/import_order_products.csv',
                input: this.inputFileOrderProduct,
                downloadService: this.downloadService
            }
        ];
    }

    private generateBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Upload de dados por planilha`,
                route: Navigation.routes.batchUpload
            }
        ];
    }
}

interface Card {
    id: CardId;
    title: string;
    description: string;
    file: any;
    upload: any;
    download: any;
    fileName: string;
    uploadedFileName?: string;
    path: string;
    loading?: boolean;
    uploading?: boolean;
    input: any;
    downloadService: DownloadService;
}

type CardId = 'customers' | 'coupons' | 'orders' | 'products' | 'order-products';
