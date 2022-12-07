import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { TaskEntity } from 'src/shared/models/entities/task.entity';
import { SalesPanelRequest } from 'src/shared/models/requests/social-media/sales-panel.request';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { SocialMediaService } from 'src/shared/services/social-media/social-media.service';
import { DateUtil, FirstAndLastDayOfWeek } from 'src/shared/utils/date.util';
import { Day, SalesPanelMapper } from './sales-panel.mapper';

@Component({
    selector: 'app-sales-panel',
    templateUrl: './sales-panel.component.html',
    styleUrls: ['./sales-panel.component.scss']
})
export class SalesPanelComponent implements OnInit {
    public days: Day[] = [];
    public loading: boolean = false;
    public filter: SalesPanelRequest = new SalesPanelRequest();
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public constructor(
        public modal: ModalService,
        private readonly toast: ToastService,
        private readonly socialMediaService: SocialMediaService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService
    ) {}

    public async ngOnInit() {
        this.sideMenuService.change('salesPanel');
        this.setBreadcrumb();
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        this.loading = true;
        const firstAndlastDay: FirstAndLastDayOfWeek = DateUtil.getFirstAndLastDayOfCurrentWeek();
        this.filter.maxDate = firstAndlastDay.lastday;
        this.filter.minDate = firstAndlastDay.firstday;
        //try {
        const tasks: TaskEntity[] = await await this.socialMediaService.listSalesPanel(this.filter as SalesPanelRequest);
        tasks.forEach((task: TaskEntity) => {
            task.scheduledDate = new Date(task.scheduledDate);
        });
        const rfmResponse: ReportCustomerResponse[] = await this.socialMediaService.listRfmStatus();
        this.days = SalesPanelMapper.mapDays(tasks, this.filter);
        debugger;
        // } catch (ex: any) {
        //     ex = ex as ZoppyException;
        //     this.toast.error(ex.message, 'Não foi possível obter os dados');
        // } finally {
        //     this.loading = false;
        // }
    }

    public openTaskDescriptionModal(task: TaskEntity): void {
        this.modal.open(
            Modal.IDENTIFIER.INPUT_INFO,
            {
                title: 'Descrição do contato',
                cancelLabel: 'Cancelar',
                placeholder: '',
                mask: '',
                rows: 4,
                selectAll: false,
                confirmLabel: 'Confirmar',
                value: ''
            },
            (description: string) => {
                //do nothing
            }
        );
    }

    public move(direction: string) {}

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Painel do Vendedor`,
                route: undefined
            }
        ];
    }
}
