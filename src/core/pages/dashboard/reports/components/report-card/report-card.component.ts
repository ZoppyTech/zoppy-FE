import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { ReportOverviewCardResponse } from 'src/shared/models/responses/reports/report-overview-card.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'app-report-card',
    templateUrl: './report-card.component.html',
    styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent implements OnInit {
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public data: ReportOverviewCardResponse = new ReportOverviewCardResponse();

    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public async ngOnInit(): Promise<void> {
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            this.data = await this.reportService.getOverviewCard();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o card de informações');
        } finally {
            this.isLoading = false;
        }
    }
}
