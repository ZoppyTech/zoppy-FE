import { Component, OnInit } from '@angular/core';
import { DashboardBasePage } from '../../../dashboard.base.page';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { Storage } from 'src/shared/utils/storage';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { ActivatedRoute, Router } from '@angular/router';
import { Navigation } from 'src/shared/utils/navigation';
import { WcGiftbackService } from 'src/shared/services/wc-giftback/wc-giftback.service';
import { WcGiftbackConfigEntity } from 'src/shared/models/entities/wc-giftback-config.entity';
import { MessageTemplateGroupEntity } from 'src/shared/models/entities/message-template-group.entity';
import { MessageTemplateService } from 'src/shared/services/message-template/message-template.service';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { GiftbackCategoryRequest, GiftbackRequest } from 'src/shared/models/requests/giftback/giftback.request';
import { CompanyUtil } from 'src/shared/utils/company.util';
import { ZoppyException } from 'src/shared/services/api.service';
import { MessageTemplateConstants } from '@ZoppyTech/utilities';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends DashboardBasePage implements OnInit {
    public tab: string = '';
    public fields: string = '';
    public loading: boolean = true;
    public config: WcGiftbackConfigEntity = new WcGiftbackConfigEntity();
    public groups: MessageTemplateGroupEntity[] = [];
    public filteredGroups: MessageTemplateGroupEntity[] = [];
    public filterCategories: boolean = false;
    public categories: Array<GiftbackCategoryRequest> = [];
    public selectedCategories: Array<any> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public giftbackService: WcGiftbackService,
        public messageTemplateService: MessageTemplateService,
        public override storage: Storage,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService,
        private readonly route: ActivatedRoute,
        private readonly router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.route.paramMap.subscribe(async (paramMap: any) => {
            this.company = this.storage.getCompany() as CompanyEntity;
            this.tab = paramMap.get('tab');
            this.setBreadcrumbItems();
            this.sideMenuService.change('configurations');
            this.sideMenuService.changeSub(`automations`);
            this.config = await this.giftbackService.find();
            this.groups = await this.messageTemplateService.listGroups();
            await this.fetchCategories();
            await this.filterGroups();
            this.loading = false;
        });
    }

    public async updateEnabled(active: boolean): Promise<void> {
        const request: GiftbackRequest = {
            id: this.config.id,
            percentValue: this.config.percentValue,
            maxPercentValue: this.config.maxPercentValue,
            expirationDays: this.config.expirationDays,
            startDays: this.config.startDays,
            afterSaleDays: this.config.afterSaleDays,
            abandonedCartDelay: this.config.abandonedCartDelay,
            npsRatingDays: this.config.npsRatingDays,
            excludeSaleItems: this.config.excludeSaleItems,
            allowedCategories: this.config.allowedCategories,
            acumulative: this.config.acumulative,
            enableGiftback: this.config.enableGiftback,
            enableAfterSale: this.config.enableAfterSale,
            enableNPS: this.config.enableNPS,
            enableBirthday: this.config.enableBirthday,
            enableAbandonedCart: this.config.enableAbandonedCart
        };

        await this.giftbackService.update(request);
        active ? this.toast.success('Fluxo ativado com sucesso!', 'Sucesso') : this.toast.alert('Fluxo desativado com sucesso!', 'Sucesso');
    }

    public acumulativeVisible(): boolean {
        if (this.tab !== 'giftback') return false;
        return CompanyUtil.isYampi(this.company) || CompanyUtil.isTray(this.company);
    }
    public excludeSaleItemsVisible(): boolean {
        if (this.tab !== 'giftback') return false;
        return CompanyUtil.isWooCommerce(this.company);
    }

    public allowedCategoriesVisible(): boolean {
        if (this.tab !== 'giftback') return false;
        return (
            CompanyUtil.isDooca(this.company) ||
            CompanyUtil.isWooCommerce(this.company) ||
            CompanyUtil.isYampi(this.company) ||
            CompanyUtil.isNuvemshop(this.company) ||
            CompanyUtil.isShopify(this.company)
        );
    }

    public getRouteName(): string {
        switch (this.tab) {
            case 'giftback':
                return 'Configurar propriedades do seu Giftback';
            case 'after_sale':
                return 'Configurar fluxo Pós Venda';
            case 'nps':
                return 'Configurar fluxo de NPS';
            case 'birthday':
                return 'Configurar mensagem de Aniversário';
            case 'abandoned_cart':
                return 'Configurar fluxo de Carrinho abandonado';
        }
        return '';
    }

    public async fetchCategories(): Promise<void> {
        try {
            setTimeout(async () => {
                this.categories = (await this.giftbackService.listCategories()) ?? [];
                this.config.allowedCategories = this.config.allowedCategories ?? [];
                this.selectedCategories = this.config.allowedCategories.map((category: GiftbackCategoryRequest) => {
                    return category.id;
                });
                if (this.config.allowedCategories && this.config.allowedCategories?.length > 0 && this.categories?.length > 0) {
                    this.filterCategories = true;
                }
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter suas categorias');
        }
    }

    public async updateGroup(group: MessageTemplateGroupEntity): Promise<void> {
        window.open(`${environment.appUrl}/dashboard/configurations/templates/config/${group.id}/${this.tab}`, '_blank');
    }

    public filterGroups(): void {
        switch (this.tab) {
            case 'giftback':
                this.filteredGroups = this.groups.filter((group: MessageTemplateGroupEntity) => {
                    return [
                        MessageTemplateConstants.DEFAULT_IDENTIFIERS.GIFTBACK_SEND,
                        MessageTemplateConstants.DEFAULT_IDENTIFIERS.GIFTBACK_MISSED_REMINDER,
                        MessageTemplateConstants.DEFAULT_IDENTIFIERS.GIFTBACK_MISSED_CLOSE_REMINDER
                    ].includes(group.identifier);
                });
                break;
            case 'after_sale':
                this.filteredGroups = this.groups.filter((group: MessageTemplateGroupEntity) => {
                    return [MessageTemplateConstants.DEFAULT_IDENTIFIERS.AFTER_SALE].includes(group.identifier);
                });
                break;
            case 'nps':
                this.filteredGroups = this.groups.filter((group: MessageTemplateGroupEntity) => {
                    return [MessageTemplateConstants.DEFAULT_IDENTIFIERS.NPS_RATING].includes(group.identifier);
                });
                break;
            case 'birthday':
                this.filteredGroups = this.groups.filter((group: MessageTemplateGroupEntity) => {
                    return [MessageTemplateConstants.DEFAULT_IDENTIFIERS.BIRTHDAY].includes(group.identifier);
                });
                break;
            case 'abandoned_cart':
                this.filteredGroups = this.groups.filter((group: MessageTemplateGroupEntity) => {
                    return [MessageTemplateConstants.DEFAULT_IDENTIFIERS.ABANDONED_CART].includes(group.identifier);
                });
                break;
        }
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: GiftbackRequest = {
                id: this.config.id,
                percentValue: parseInt(this.config.percentValue?.toString() ?? ''),
                maxPercentValue: parseInt(this.config.maxPercentValue?.toString() ?? ''),
                expirationDays: parseInt(this.config.expirationDays?.toString() ?? ''),
                startDays: parseInt(this.config.startDays?.toString() ?? ''),
                afterSaleDays: parseInt(this.config.afterSaleDays?.toString() ?? ''),
                npsRatingDays: parseInt(this.config.npsRatingDays?.toString() ?? ''),
                abandonedCartDelay: parseInt(this.config.abandonedCartDelay?.toString() ?? ''),
                acumulative: this.config.acumulative,
                enableGiftback: this.config.enableGiftback,
                enableAfterSale: this.config.enableAfterSale,
                enableNPS: this.config.enableNPS,
                enableBirthday: this.config.enableBirthday,
                enableAbandonedCart: this.config.enableAbandonedCart,
                excludeSaleItems: this.config.excludeSaleItems,
                allowedCategories: this.mapAllowedCategories()
            };
            const response: WcGiftbackConfigEntity = this.config.id
                ? await this.giftbackService.update(request)
                : await this.giftbackService.create(request);
            this.config = response as GiftbackRequest;
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    public mapAllowedCategories(): GiftbackCategoryRequest[] {
        if (!this.filterCategories) return [];
        return this.categories.filter((category: GiftbackCategoryRequest) => {
            return this.selectedCategories.includes(category.id);
        });
    }

    public getSaveDisabled(): boolean {
        return !this.config.maxPercentValue || !this.config.percentValue || !this.config.expirationDays;
    }

    private setBreadcrumbItems(): void {
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
                name: `Automações`,
                route: Navigation.routes.automations
            },
            {
                name: this.getRouteName(),
                route: Navigation.routes.automationForm
            }
        ];
    }
}
