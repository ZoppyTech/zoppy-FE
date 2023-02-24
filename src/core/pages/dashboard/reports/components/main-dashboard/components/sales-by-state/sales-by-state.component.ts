import { AfterViewInit, Component, Input, OnDestroy, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { GetReportRequest } from 'src/shared/models/requests/report/get-report.request';
import { ReportSaleByStateResponse } from 'src/shared/models/responses/reports/report-sale-by-state.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { ReportService } from 'src/shared/services/reports/report.service';

@Component({
    selector: 'sales-by-state',
    templateUrl: './sales-by-state.component.html',
    styleUrls: ['./sales-by-state.component.scss']
})
export class SalesByStateComponent implements OnDestroy, AfterViewInit {
    public data: ReportSaleByStateResponse[] = [];
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;

    public states: Array<StateChartValues> = [];
    public regions: Array<[StateChartKeys, Array<StateChartValues>]> = [];

    public canvas: any;
    public ctx: any;
    @ViewChild('MainDashStateChart') public MainDashStateChart: any;
    public declare chart: any;
    public chartLabels: Array<string> = [];
    public chartData: Array<any> = [];

    @Input() public reportRequest?: GetReportRequest;

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public ngOnDestroy(): void {
        this.chart?.destroy();
        BroadcastService.dispose(this);
    }

    public async ngAfterViewInit(): Promise<void> {
        this.setEvents();
        await this.fetchChartData();
        this.initializeChart();
    }

    public async initializeChart(): Promise<void> {
        this.isLoading = true;
        this.filterAndMapStates();
        this.groupStatesByRegion();
        this.setChartDatasets();
        this.isLoading = false;
        this.drawChart(true);
    }

    public setChartDatasets(): void {
        this.chartLabels = this.regions.map((region: [StateChartKeys, Array<StateChartValues>]) => {
            return region[0].title;
        });
        this.chartData = this.regions.map((region: [StateChartKeys, Array<StateChartValues>]) => {
            return region[1]
                .map((stateChartValue: StateChartValues) => Number.parseFloat(stateChartValue.amount))
                .reduce((prev: number, curr: number) => prev + curr, 0);
        });
    }

    public drawChart(newInstance: boolean = false): void {
        setTimeout(() => {
            if (!this.chart || newInstance) this.chart = this.createNewChartInstance();
            this.updateChartDatasets();
            this.chart?.update();
        }, 0);
    }

    public updateChartDatasets(): void {
        if (!this.chart) return;
        this.chart.config.data.datasets[0].data = this.chartData;
        this.chart.config.data.labels = this.chartLabels;
    }

    public async fetchChartData(): Promise<void> {
        try {
            this.data = await this.reportsService.getSalesByState(this.reportRequest as GetReportRequest);
            console.log(this.data);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o gráfico de vendas por estado');
        }
    }

    public getChartReference(): any {
        return this.MainDashStateChart?.nativeElement ?? document.getElementById('MainDashStateChart');
    }

    public createNewChartInstance(newInstance: boolean = true): Chart | null {
        if (this.chart && newInstance) this.chart.destroy();
        this.canvas = this.getChartReference();
        if (!this.canvas) return null;
        this.ctx = this.canvas.getContext('2d');
        return new Chart(this.ctx, {
            type: 'bar',
            data: {
                datasets: [
                    {
                        label: 'Compras por estado',
                        data: this.chartData,
                        backgroundColor: ['#B6C0FF', '#FFB2FF', '#68EAFF', '#00F8DF']
                    }
                ],
                labels: this.chartLabels
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: []
        });
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'refresh-report', async (period: GetReportRequest) => {
            (this.reportRequest as GetReportRequest).startPeriod = period.startPeriod;
            (this.reportRequest as GetReportRequest).finishPeriod = period.finishPeriod;
            this.isLoading = true;
            await this.fetchChartData();
            this.initializeChart();
        });
    }

    public filterAndMapStates(): void {
        this.resetStates();
        this.states = this.data.map((value: ReportSaleByStateResponse) => {
            return {
                name: value.state,
                amount: value.amount
            };
        });
    }

    public groupStatesByRegion(): void {
        this.regions = [];
        this.regions.push([{ id: Regions.North, title: 'Norte' }, this.getStatesByAcronyms(['AM', 'RR', 'AP', 'PA', 'TO', 'RO', 'AC'])]);
        this.regions.push([
            { id: Regions.Northeast, title: 'Nordeste' },
            this.getStatesByAcronyms(['MA', 'PI', 'CE', 'RN', 'PE', 'PB', 'SE', 'AL', 'BA'])
        ]);
        this.regions.push([{ id: Regions.Midwest, title: 'Centro-Oeste' }, this.getStatesByAcronyms(['MT', 'MS', 'GO'])]);
        this.regions.push([{ id: Regions.Southeast, title: 'Sudeste' }, this.getStatesByAcronyms(['SP', 'RJ', 'ES', 'MG'])]);
        this.regions.push([{ id: Regions.South, title: 'Sul' }, this.getStatesByAcronyms(['PR', 'RS', 'SC'])]);
    }

    public getStatesByAcronyms(acronyms: Array<string>): Array<StateChartValues> {
        if (acronyms.length <= 0) return [];
        return this.states.filter((state: StateChartValues) => {
            return acronyms.includes(state.name);
        });
    }

    public resetStates(): void {
        this.states = [];
    }
}

class StateChartKeys {
    public declare id: Regions;
    public declare title: string;
}

class StateChartValues {
    public declare name: string;
    public declare amount: string;
}

export enum Regions {
    North,
    Northeast,
    Midwest,
    Southeast,
    South
}
