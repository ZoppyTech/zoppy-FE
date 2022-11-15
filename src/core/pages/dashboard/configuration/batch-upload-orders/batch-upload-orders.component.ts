import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { debug } from 'console';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { DownloadService } from 'src/shared/services/download/download.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { FileUtils } from 'src/shared/utils/file.util';

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

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public readonly downloadService: DownloadService,
        public toast: ToastService
    ) {}
    public ngAfterViewInit(): void {
        setTimeout(() => {
            this.initializeCards();
        });
    }

    public cards: Array<Card> = [];

    public ngOnInit(): void {
        this.sideMenuService.changeSub(`batchUpload`);
        this.sideMenuService.change('configurations');
        this.generateBreadcrumb();
    }

    public async download(card: Card): Promise<void> {
        debugger;
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
        debugger;

        this.cards.forEach((card: Card) => {
            if (card.id === id) {
                card.file = file;
                card.uploadedFileName = file.name;
            }
        });
    }

    public upload(card: Card): void {
        debugger;
        if (!card.input) return;
        card.input.nativeElement.click();
    }

    public async execute(card: Card): Promise<void> {
        switch (card.id) {
            case 'customers':
                break;
        }
    }

    public initializeCards(): void {
        this.cards = [
            {
                id: 'customers',
                title: 'Cliente'.toUpperCase(),
                description:
                    'User a planilha base Zoppy_Clientes.csv para importar os novos clientes, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Clientes.csv',
                path: '/docs/Import_customers_zoppy.csv',
                input: this.inputFileCustomer,
                downloadService: this.downloadService,
                sendMessage: false
            },
            {
                id: 'coupons',
                title: 'Coupons'.toUpperCase(),
                description:
                    'User a planilha base Zoppy_Coupons.csv para importar os novos coupons, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Coupons.csv',
                path: '/docs/import_coupons_zoppy.csv',
                input: this.inputFileCoupon,
                downloadService: this.downloadService,
                sendMessage: false
            },
            {
                id: 'products',
                title: 'Produtos'.toUpperCase(),
                description:
                    'User a planilha base Zoppy_Produtos.csv para importar os novos produtos, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Produtos.csv',
                path: '/docs/import_products_zoppy.csv',
                input: this.inputFileProduct,
                downloadService: this.downloadService,
                sendMessage: false
            },
            {
                id: 'orders',
                title: 'Pedidos'.toUpperCase(),
                description:
                    'User a planilha base Zoppy_Pedidos.csv para importar os novos pedidos, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Pedidos.csv',
                path: '/docs/import_orders_zoppy.csv',
                input: this.inputFileOrder,
                downloadService: this.downloadService,
                sendMessage: false,
                hasSendMessage: true
            },
            {
                id: 'order-products',
                title: 'Produtos dos pedidos'.toUpperCase(),
                description:
                    'User a planilha base Zoppy_Produtos_dos_Pedidos.csv para importar os novos produtos dos pedidos, tenha cuidado com o formato dos dados!',
                file: undefined,
                upload: this.upload,
                download: this.download,
                fileName: 'Zoppy_Produtos_dos_Pedidos.csv',
                path: '/docs/import_order_products.csv',
                input: this.inputFileOrderProduct,
                downloadService: this.downloadService,
                sendMessage: false
            }
        ];
    }

    private generateBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Upload em lote`,
                route: `/dashboard/configurations/batch-upload`
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
    sendMessage: boolean;
    hasSendMessage?: boolean;
    sendMessageLabel?: string;
}

type CardId = 'customers' | 'coupons' | 'orders' | 'products' | 'order-products';
