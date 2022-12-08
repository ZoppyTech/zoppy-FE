import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest, ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'gender-chart',
    templateUrl: './gender-chart.component.html',
    styleUrls: ['./gender-chart.component.scss']
})
export class GenderChartComponent implements OnInit {
    @Input() public data: ReportCustomerResponse[] = [];
    @Input() public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public doughnutChartOptions: any = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        backgroundColor: ['#68EAFF', '#FFB2FF', '#B6C0FF']
    };
    public doughnutChartLabels: string[] = [];
    public doughnutChartLegend: boolean = false;
    public doughnutChartData: any[] = [{ data: [], label: 'Compras por estado' }];
    public legends: Legend[] = [];
    @Input() public reportRequest: GetReportRequest = {
        period: 30 as ReportPeriod
    };

    public chart: any;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnInit(): void {
        this.setLegend();
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes['isLoading'] && changes['isLoading'].currentValue === false) {
            this.initializeData();
        }
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    // public setEvents(): void {
    //     BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
    //         this.reportRequest.period = period;
    //         await this.initializeData();
    //     });
    // }

    public configureGender(): void {
        console.log(this.data);
        this.doughnutChartData[0].data = [this.filterGenderByType('M'), this.filterGenderByType('F'), this.filterGenderByType(null)];
        this.doughnutChartLabels = ['Masculino', 'Feminino', 'Não registrado'];
    }

    public filterGenderByType(type: string | null): string {
        const genders: ReportCustomerResponse[] = this.data.filter((value: ReportCustomerResponse) => {
            return value?.gender === type;
        });
        return this.ruleOfThree(genders.length);
    }

    public ruleOfThree(value: any): string {
        if (this.data.length <= 0) return '';
        return ((value * 100) / this.data.length).toFixed(1);
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        this.configureGender();
        this.isLoading = false;
    }

    public setLegend(): void {
        this.legends = [
            {
                value: 'Feminino',
                color: '#FFB2FF'
            },
            {
                value: 'Masculino',
                color: '#68EAFF'
            },
            {
                value: 'Não registrado',
                color: '#B6C0FF'
            }
        ];
    }
}

interface Legend {
    color: string;
    value: string;
}
