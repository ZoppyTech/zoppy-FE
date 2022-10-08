import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { MonthInvoice, MonthlyInvoiceResponse } from 'src/shared/models/responses/reports/monthly-invoice.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';
import { DateUtil } from 'src/shared/utils/date.util';

@Component({
    selector: 'app-monthly-invoices',
    templateUrl: './monthly-invoices.component.html',
    styleUrls: ['./monthly-invoices.component.scss']
})
export class MonthlyInvoicesComponent implements OnInit {
    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public data: MonthlyInvoiceResponse = new MonthlyInvoiceResponse();
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public legends: Legend[] = [];

    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: false,
        indexAxis: 'x',
        plugins: {
            legend: {
                display: false
            }
        }
    };
    public chartLabels: string[] = [];
    public chartLegend: boolean = false;
    public chartData: any[] = [
        {
            type: 'line',
            label: 'Line Dataset',
            data: [],
            borderColor: '#7b3dff',
            pointBackgroundColor: '#7b3dff',
            pointBorderColor: '#7b3dff'
        },
        {
            type: 'bar',
            label: 'Bar Dataset',
            data: [],
            backgroundColor: ['#E3D6FD']
        }
    ];

    public async ngOnInit() {
        console.log('data');
        await this.fetchData();
        this.isLoading = false;
        this.setLegends();
    }

    public setLegends(): void {
        this.legends = [
            {
                value: 'Faturamento mensal',
                color: '#E3D6FD'
            },
            {
                value: 'Receita direta com a Zoppy',
                color: '#7B3DFF'
            }
        ];
    }

    public async fetchData(): Promise<void> {
        try {
            this.data = await this.reportService.getMonthlyInvoices();
            this.data.invoices.forEach((invoice: MonthInvoice) => {
                this.chartLabels.push(invoice.name);
                this.chartData[1].data.push(invoice.invoice);
                this.chartData[0].data.push(invoice.zoppyInvoice as number);
            });
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o card de informações');
        } finally {
            this.isLoading = false;
        }
    }
}

interface Legend {
    color: string;
    value: string;
}
