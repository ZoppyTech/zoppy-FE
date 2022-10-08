import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'app-contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    public customers: Array<ReportCustomerResponse> = [];
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public async ngOnInit(): Promise<void> {
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            this.customers = await this.reportsService.getCustomers();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        } finally {
            this.isLoading = false;
        }
    }
}
