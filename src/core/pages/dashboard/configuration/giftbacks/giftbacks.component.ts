import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { ZoppyFilter } from 'src/shared/models/filter';
import { CrmCouponResponse } from 'src/shared/models/responses/crm/crm-coupon.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmCouponService } from 'src/shared/services/crm-coupon/crm-coupon.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { FileUtils } from 'src/shared/utils/file.util';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-giftbacks',
    templateUrl: './giftbacks.component.html',
    styleUrls: ['./giftbacks.component.scss']
})
export class GiftbacksComponent implements OnInit {
    public loading: boolean = false;
    public coupons: Array<CrmCouponResponse> = [];
    public filter: ZoppyFilter<CrmCouponResponse> = new ZoppyFilter<CrmCouponResponse>();

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public modal: ModalService,
        public toast: ToastService,
        public crmCouponService: CrmCouponService
    ) {}

    public async ngOnInit(): Promise<void> {
        this.filter.searchFields = ['code', 'description'];
        this.filter.orderBy.push({
            property: 'createdAt',
            direction: 'DESC'
        });
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub('coupons');
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            const response: ZoppyFilter<CrmCouponResponse> = await this.crmCouponService.findAllPaginated(this.filter);
            this.filter.pagination = response.pagination;
            this.coupons = (response.data as CrmCouponResponse[]) ?? [];
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        }
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

    public async download(): Promise<void> {
        const fileName: string = `${new Date().toLocaleDateString()}_coupons.csv`;
        try {
            const file: any = await this.crmCouponService.downloadCsv();
            FileUtils.downloadBlob(fileName, file);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        }
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Giftbacks`,
                route: undefined
            }
        ];
    }
}
