import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { CrmProductResponse } from 'src/shared/models/responses/crm/crm-product.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmProductService } from 'src/shared/services/crm-product/crm-product.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { ArrayUtil } from 'src/shared/utils/array-util';
import { Storage } from 'src/shared/utils/storage';
import { DownloadService } from 'src/shared/services/download/download.service';
import { ZoppyFilter } from 'src/shared/models/filter';
import { FileUtils } from 'src/shared/utils/file.util';
import { WcProductEntity } from 'src/shared/models/entities/wc-product.entity';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { Router } from '@angular/router';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public loading: boolean = false;
    public downloading: boolean = false;
    public products: Array<CrmProductResponse> = [];
    public filter: ZoppyFilter<CrmProductResponse> = new ZoppyFilter<CrmProductResponse>();

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public modal: ModalService,
        public toast: ToastService,
        public crmProductService: CrmProductService,
        public downloadService: DownloadService,
        public router: Router,
        public confirmActionService: ConfirmActionService
    ) {}

    @ViewChild('inputFile') public input: any;

    public async ngOnInit() {
        this.filter.searchFields = ['name'];
        this.sideMenuService.change('products');
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            const response: ZoppyFilter<CrmProductResponse> = await this.crmProductService.findAllPaginated(this.filter);
            this.filter.pagination = response.pagination;
            this.products = response.data.map((product: CrmProductResponse) => {
                if (product.categories && product.categories.length > 0)
                    product.categoriesFormatted = ArrayUtil.toString(
                        product.categories?.map((category: any) => {
                            return category.name;
                        })
                    );
                return product;
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os produtos');
        }
    }

    public async remove(product: CrmProductResponse): Promise<void> {
        this.confirmActionService.open(
            'Deletar o produto',
            'Tem certeza que deseja deletar esse produto? Essa ação nao poderá ser desfeita.',
            async (result: boolean) => {
                if (!result) return;
                try {
                    await this.crmProductService.destroy(product.id);
                    await this.fetchData();
                    this.toast.success('Esse produto foi removido e não pode ser mais usado', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível deletar esse produto');
                }
            }
        );
    }

    public async update(product: CrmProductResponse): Promise<void> {
        this.router.navigate([Navigation.routes.products, product.id]);
    }

    public async onSearchTextChanged(searchText: string = ''): Promise<void> {
        this.filter.pagination.page = 1;
        this.filter.searchText = searchText;
        await this.fetchData();
    }

    public async onPaginationChanged(page: number): Promise<void> {
        this.filter.pagination.page = page;
        await this.fetchData();
    }

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Cadastro de produtos',
            button: 'Entendi',
            description: `IMPORTANTE! Após enviar a planilha com seus produtos, você não poderá editar ou apagá-los. Para cadastrar novos produtos, baixe novamente a planilha e insira <b>somente</b> aqueles que ainda não foram enviados. Se inserir produtos que já foram cadastrados, eles ficarão duplicados na plataforma.`
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
            await this.crmProductService.upload(file);
            this.toast.success('Seus produtos foram adicionados com sucesso!', 'Sucesso!');
            await this.fetchData();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seus produtos');
        } finally {
            this.loading = false;
        }
    }

    public async download(): Promise<void> {
        const fileName: string = 'Zoppy Produtos.csv';
        const type: string = 'text/csv';
        const path: string = '/docs/import_products_zoppy.csv';
        this.downloading = true;
        try {
            const file: any = await this.downloadService.downloadPublicFile(path, fileName, type);
            FileUtils.downloadBlob(fileName, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.downloading = false;
        }
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Gerenciamento de produtos`,
                route: undefined
            }
        ];
    }
}
