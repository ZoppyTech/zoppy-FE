import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { CrmProductRequest } from 'src/shared/models/requests/crm/crm-product.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmProductService } from 'src/shared/services/crm-product/crm-product.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
    public specifications: Item[] = [
        {
            label: 'Masculino',
            value: 'Masculino'
        },
        {
            label: 'Feminino',
            value: 'Feminino'
        }
    ];
    public loading: boolean = false;
    public loaded: boolean = false;
    public id: string = '';
    public product: CrmProductRequest = {};

    public constructor(
        public breadcrumb: BreadcrumbService,
        public sideMenuService: SideMenuService,
        private readonly crmProductService: CrmProductService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly toast: ToastService
    ) {}

    public async ngOnInit() {
        this.sideMenuService.change('products');
        this.setBreadcrumb();
        this.id = this.route.snapshot.paramMap.get('id') ?? '';
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        if (!this.id) {
            this.loaded = true;
            return;
        }
        try {
            const product: CrmProductRequest = await this.crmProductService.findById(this.id);
            if (product) this.product = product;
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
            const request: CrmProductRequest = {
                id: this.id,
                name: this.product.name,
                categories: this.product.categories,
                specification: this.product.specification,
                price: this.product.price
            };
            this.id ? await this.crmProductService.update(this.id, request) : await this.crmProductService.create(request);
            this.toast.success('Sucesso', 'Informações atualizadas');
            this.router.navigate([Navigation.routes.products]);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    public addCategory(): void {
        if (!this.product.categories) this.product.categories = [];
        this.product.categories.push({ name: '' });
    }

    public removeCategory(index: number): void {
        this.product.categories?.splice(index, 1);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Gerenciamento de produtos`,
                route: Navigation.routes.products
            },
            {
                name: this.id ? `Editar Produto` : 'Criar Produto',
                route: Navigation.routes.products
            }
        ];
    }
}

interface Item {
    label: string;
    value: string | null;
}
