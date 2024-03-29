import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ReportOverviewCardResponse } from 'src/shared/models/responses/reports/report-overview-card.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'report-card',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit, OnDestroy {
    public isLoading: boolean = true;
    public hasData: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public data: ReportOverviewCardResponse = new ReportOverviewCardResponse();
    @Input() public reportRequest?: GetReportRequest;

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public async ngOnInit(): Promise<void> {
        await this.fetchData();
        this.setEvents();
    }

    public async fetchData(): Promise<void> {
        try {
            this.isLoading = true;
            this.data = await this.reportService.getOverviewCard(this.reportRequest as GetReportRequest);
            this.hasData = this.data?.totalSales > 0;
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o card de informações');
        } finally {
            this.isLoading = false;
        }
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            (this.reportRequest as GetReportRequest).startPeriod = period.startPeriod;
            (this.reportRequest as GetReportRequest).finishPeriod = period.finishPeriod;
            await this.fetchData();
        });
    }
}
