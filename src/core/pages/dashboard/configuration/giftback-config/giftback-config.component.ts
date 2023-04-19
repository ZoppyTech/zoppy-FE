import { CompanyUtil } from 'src/shared/utils/company.util';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WcGiftbackConfigEntity } from 'src/shared/models/entities/wc-giftback-config.entity';
import { GiftbackCategoryRequest, GiftbackRequest } from 'src/shared/models/requests/giftback/giftback.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcGiftbackService } from 'src/shared/services/wc-giftback/wc-giftback.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-giftback-config',
    templateUrl: './giftback-config.component.html',
    styleUrls: ['./giftback-config.component.scss']
})
export class GiftbackConfigComponent implements OnInit {
    public giftback: GiftbackRequest = {
        excludeSaleItems: false,
        acumulative: false,
        allowedCategories: [],
        abandonedCartDelay: 4,
        enableGiftback: true,
        enableAfterSale: true,
        enableNPS: true,
        enableBirthday: true,
        enableAbandonedCart: true
    };
    public loading: boolean = false;
    public npsRatingDaysActive: boolean = false;
    public filterCategories: boolean = false;
    public company: CompanyEntity | undefined;
    public categories: Array<GiftbackCategoryRequest> = [];
    public selectedCategories: Array<any> = [];

    public constructor(
        private readonly toast: ToastService,
        public sideMenuService: SideMenuService,
        public storage: Storage,
        public breadcrumb: BreadcrumbService,
        public giftbackService: WcGiftbackService
    ) {}

    public async ngOnInit() {
        this.setBreadcrumb();
        this.sideMenuService.changeSub(`giftback`);
        this.sideMenuService.change('configurations');
        this.company = this.storage.getCompany() as CompanyEntity;
        await this.fetchData();
        await this.fetchCategories();
    }

    public acumulativeVisible(): boolean {
        return CompanyUtil.isYampi(this.company) || CompanyUtil.isTray(this.company);
    }
    public excludeSaleItemsVisible(): boolean {
        return CompanyUtil.isWooCommerce(this.company);
    }
    public allowedCategoriesVisible(): boolean {
        return (
            CompanyUtil.isDooca(this.company) ||
            CompanyUtil.isWooCommerce(this.company) ||
            CompanyUtil.isYampi(this.company) ||
            CompanyUtil.isNuvemshop(this.company) ||
            CompanyUtil.isShopify(this.company)
        );
    }

    public async fetchData(): Promise<void> {
        try {
            this.giftback = ((await this.giftbackService.find()) as GiftbackRequest) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter suas configurações de giftback');
        }
    }

    public async fetchCategories(): Promise<void> {
        try {
            setTimeout(async () => {
                this.categories = (await this.giftbackService.listCategories()) ?? [];
                this.giftback.allowedCategories = this.giftback.allowedCategories ?? [];
                this.selectedCategories = this.giftback.allowedCategories.map((category: GiftbackCategoryRequest) => {
                    return category.id;
                });
                if (this.giftback.allowedCategories && this.giftback.allowedCategories?.length > 0 && this.categories?.length > 0) {
                    this.filterCategories = true;
                }
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter suas categorias');
        }
    }

    public mapAllowedCategories(): GiftbackCategoryRequest[] {
        if (!this.filterCategories) return [];
        return this.categories.filter((category: GiftbackCategoryRequest) => {
            return this.selectedCategories.includes(category.id);
        });
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: GiftbackRequest = {
                id: this.giftback.id,
                percentValue: parseInt(this.giftback.percentValue?.toString() ?? ''),
                maxPercentValue: parseInt(this.giftback.maxPercentValue?.toString() ?? ''),
                expirationDays: parseInt(this.giftback.expirationDays?.toString() ?? ''),
                startDays: parseInt(this.giftback.startDays?.toString() ?? ''),
                afterSaleDays: parseInt(this.giftback.afterSaleDays?.toString() ?? ''),
                npsRatingDays: parseInt(this.giftback.npsRatingDays?.toString() ?? ''),
                abandonedCartDelay: parseInt(this.giftback.abandonedCartDelay?.toString() ?? ''),
                acumulative: this.giftback.acumulative,
                enableGiftback: this.giftback.enableGiftback,
                enableAfterSale: this.giftback.enableAfterSale,
                enableNPS: this.giftback.enableNPS,
                enableBirthday: this.giftback.enableBirthday,
                enableAbandonedCart: this.giftback.enableAbandonedCart,
                excludeSaleItems: this.giftback.excludeSaleItems,
                allowedCategories: this.mapAllowedCategories()
            };
            const response: WcGiftbackConfigEntity = this.giftback.id
                ? await this.giftbackService.update(request)
                : await this.giftbackService.create(request);
            this.giftback = response as GiftbackRequest;
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    public getSaveDisabled(): boolean {
        return !this.giftback.maxPercentValue || !this.giftback.percentValue || !this.giftback.expirationDays;
    }

    private setBreadcrumb(): void {
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
                name: `Configuração de Giftback`,
                route: Navigation.routes.giftback
            }
        ];
    }
}
