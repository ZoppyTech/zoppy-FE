import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { Chart } from 'chart.js';
import { environment } from 'src/environments/environment';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer.response';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';

@Component({
    selector: 'state-chart',
    templateUrl: './state-chart.component.html',
    styleUrls: ['./state-chart.component.scss']
})
export class StateChartComponent implements OnInit, OnChanges {
    @Input() public data: ReportCustomerResponse[] = [];
    @Output() public dataChange: EventEmitter<ReportCustomerResponse[]> = new EventEmitter<ReportCustomerResponse[]>();
    @Input() public isLoading: boolean = false;
    public currentRegionTitle: string = '';
    public currentRegionIndex: number = Regions.Southeast;
    public states: Array<StateChartValues> = [];
    public regions: Array<[StateChartKeys, Array<StateChartValues>]> = [];
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public canvas: any;
    public ctx: any;
    @ViewChild('rfmStateChart') public rfmStateChart: any;
    public declare chart: any;
    public chartLabels: Array<string> = [];
    public chartData: Array<any> = [];

    public constructor(private readonly toast: ToastService) {}

    public ngOnInit(): void {
        // no content
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes['isLoading'] && changes['isLoading'].currentValue === false) {
            this.initializeChart();
        }
    }

    public ngOnDestroy(): void {
        this.chart?.destroy();
        BroadcastService.dispose(this);
    }

    public async initializeChart(): Promise<void> {
        this.isLoading = true;
        this.filterAndMapStates();
        this.groupStatesByRegion();
        this.setChartDatasets();
        this.isLoading = false;
        this.drawChart(true);
    }

    public filterAndMapStates(): void {
        this.resetStates();
        for (const customer of this.data) {
            const stateIndex: number = this.states.findIndex((state: StateChartValues) => {
                return state.name === customer.state;
            });
            if (stateIndex === -1) {
                this.states.push({ name: customer.state, amount: 1 });
                continue;
            }
            this.states[stateIndex].amount += 1;
        }
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

    public navigateBackwards(): void {
        this.currentRegionIndex = (this.regions.length + this.currentRegionIndex - 1) % this.regions.length;
        this.setChartDatasets();
        this.drawChart();
    }

    public navigateForward(): void {
        this.currentRegionIndex = (this.regions.length + this.currentRegionIndex + 1) % this.regions.length;
        this.setChartDatasets();
        this.drawChart();
    }

    public setChartDatasets(): void {
        this.chartLabels = [];
        this.chartData = [];
        this.currentRegionTitle = this.regions[this.currentRegionIndex][0].title;
        this.regions[this.currentRegionIndex][1].forEach((state: StateChartValues) => {
            this.chartLabels.push(state.name.toString());
            this.chartData.push(this.ruleOfThree(state.amount));
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
                maintainAspectRatio: false,
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            },
            plugins: []
        });
    }

    public getChartReference(): any {
        return this.rfmStateChart?.nativeElement ?? document.getElementById('rfmStateChart');
    }

    public setEvents(): void {
        // BroadcastService.subscribe(this, 'refresh-report', async (startPeriod: Date, finishPeriod: Date) => {
        //     this.reportRequest.startPeriod = startPeriod;
        //     this.reportRequest.finishPeriod = finishPeriod;
        //     await this.initializeChart();
        // });
    }

    public resetStates(): void {
        this.states = [];
    }

    public ruleOfThree(value: any): string {
        return ((value * 100) / this.data.length).toFixed(2);
    }
}

class StateChartKeys {
    public declare id: Regions;
    public declare title: string;
}

class StateChartValues {
    public declare name: string;
    public declare amount: number;
}

export enum Regions {
    North,
    Northeast,
    Midwest,
    Southeast,
    South
}
