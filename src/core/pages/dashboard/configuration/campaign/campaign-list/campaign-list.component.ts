import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../../dashboard.base.page';
import { Navigation } from 'src/shared/utils/navigation';
import { CampaignService } from 'src/shared/services/campaign/campaign.service';
import { CampaignEntity } from 'src/shared/models/entities/campaign.entity';
import { ZoppyFilter } from 'src/shared/models/filter';
import { ZoppyException } from 'src/shared/services/api.service';
import { MessageTemplateService } from 'src/shared/services/message-template/message-template.service';

@Component({
    selector: 'app-campaign-list',
    templateUrl: './campaign-list.component.html',
    styleUrls: ['./campaign-list.component.scss']
})
export class CampaignListComponent extends DashboardBasePage implements OnInit {
    public filter: ZoppyFilter<CampaignEntity> = new ZoppyFilter<CampaignEntity>();
    public loading: boolean = true;
    public campaigns: Array<CampaignEntity> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public toast: ToastService,
        public campaignService: CampaignService,
        public messageTemplateService: MessageTemplateService,
        public override storage: Storage,
        private readonly confirmActionService: ConfirmActionService,
        private readonly router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.filter.searchFields = ['name'];
        this.filter.orderBy.push({
            property: 'createdAt',
            direction: 'DESC'
        });

        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`campaigns`);
        this.setBreadcrumb();
        await this.fetchData();
        this.loading = false;
    }

    public async fetchData(): Promise<void> {
        try {
            const response: ZoppyFilter<CampaignEntity> = await this.campaignService.findAllPaginated(this.filter);
            this.filter.pagination = response.pagination;
            this.campaigns = (response.data as CampaignEntity[]) ?? [];
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter as campanhas');
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

    public create(): void {
        this.router.navigate([Navigation.routes.campaignConfig]);
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
                name: `Campanhas`,
                route: Navigation.routes.campaignList
            }
        ];
    }
}
