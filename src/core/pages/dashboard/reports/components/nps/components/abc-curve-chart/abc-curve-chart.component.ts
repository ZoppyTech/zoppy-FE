import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { AbcResponse } from 'src/shared/models/responses/reports/abc.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'abc-curve-chart',
    templateUrl: './abc-curve-chart.component.html',
    styleUrls: ['./abc-curve-chart.component.scss']
})
export class AbcCurveChartComponent implements OnInit, OnDestroy {
    public constructor(private readonly reportService: ReportService, private readonly toast: ToastService) {}

    public isLoading: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public data: AbcResponse = new AbcResponse();
    public legends: Legend[] = [];
    public type: ItemType = 'categories';

    public types: Item[] = [
        {
            label: 'Produto',
            value: 'products'
        },
        {
            label: 'Categoria',
            value: 'categories'
        }
    ];

    @Input() public reportRequest: GetReportRequest = {
        startPeriod: new Date(),
        finishPeriod: new Date()
    };

    public chartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: false,
        indexAxis: 'x',
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            A: {
                id: 'A',
                type: 'linear',
                display: true,
                position: 'left'
            },
            B: {
                id: 'B',
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false
                }
            }
        }
    };

    public chartData: any[] = [
        {
            type: 'line',
            label: 'Porcentagem do total',
            data: [],
            yAxisID: 'A',
            borderColor: '#7b3dff',
            pointBackgroundColor: '#7b3dff',
            pointBorderColor: '#7b3dff'
        },
        {
            type: 'bar',
            label: 'Quantidade de itens',
            data: [],
            yAxisID: 'B',
            backgroundColor: ['#CDD6FF']
        }
    ];
    public chartLabels: string[] = [];
    public chartLegend: boolean = false;

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        await this.fetchData(this.type);
        this.setLegends();
        this.isLoading = false;
    }

    public setLegends(): void {
        this.legends = [
            {
                value: 'Quantidade de itens',
                color: '#CDD6FF'
            },
            {
                value: 'Porcentagem do total',
                color: '#7B3DFF'
            }
        ];
    }

    public async fetchData(type: ItemType): Promise<void> {
        this.isLoading = true;
        try {
            this.type = type;
            this.data = await this.reportService.getAbc(this.reportRequest, this.type);
            this.processInformation();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter a curva ABC');
            console.error(ex);
        } finally {
            this.isLoading = false;
        }
    }

    public async ngOnInit() {
        await this.initializeData();
        this.setEvents();
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            this.reportRequest.startPeriod = period.startPeriod;
            this.reportRequest.finishPeriod = period.finishPeriod;
            await this.initializeData();
        });
    }

    public processInformation(): void {
        this.chartData[0].data = [];
        this.chartData[1].data = [];
        this.chartLabels = [];

        for (const item of this.data[this.type]) {
            this.chartData[0].data.push(item.percent);
            this.chartData[1].data.push(item.amount);
            this.chartLabels.push(item.name);
        }
    }
}

interface Legend {
    color: string;
    value: string;
}

interface Item {
    label: string;
    value: ItemType;
}

type ItemType = 'products' | 'categories';
