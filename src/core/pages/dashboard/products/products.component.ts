import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { environment } from 'src/environments/environment';
import { CrmProductResponse } from 'src/shared/models/responses/crm/crm-product.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmProductService } from 'src/shared/services/crm-product/crm-product.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { ArrayUtil } from 'src/shared/utils/array-util';
import { Storage } from 'src/shared/utils/storage';
import { FileUtils } from 'src/shared/utils/file.util';
import { PublicService } from 'src/shared/services/public/public.service';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public loading: boolean = false;
    public products: Array<CrmProductResponse> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public modal: ModalService,
        public toast: ToastService,
        public crmProductService: CrmProductService,
        public publicService: PublicService
    ) {}

    @ViewChild('inputFile') public input: any;

    public async ngOnInit() {
        this.sideMenuService.change('products');
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            const response: Array<CrmProductResponse> = await this.crmProductService.findAll();
            this.products = response.map((product: CrmProductResponse) => {
                product.categoriesFormatted = ArrayUtil.toString(
                    product.categories.map((category: any) => {
                        return category.name;
                    })
                );
                return product;
            }) as CrmProductResponse[];
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os produtos');
        }
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
                name: `Cadastro de produtos`,
                route: undefined
            }
        ];
    }
}
