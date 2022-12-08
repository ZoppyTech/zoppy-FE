import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';

@Component({
    selector: 'state-chart',
    templateUrl: './state-chart.component.html',
    styleUrls: ['./state-chart.component.scss']
})
export class StateChartComponent implements OnInit, OnChanges {
    @Input() public data: ReportCustomerResponse[] = [];
    @Output() public dataChange: EventEmitter<ReportCustomerResponse[]> = new EventEmitter<ReportCustomerResponse[]>();
    @Input() public isLoading: boolean = true;
    public currentRegionTitle: string = '';
    public currentRegionIndex: number = Regions.Southeast;
    public states: Array<StateChartValues> = [];
    public regions: Array<[StateChartKeys, Array<StateChartValues>]> = [];
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true,
        indexAxis: 'y',
        backgroundColor: ['#B6C0FF', '#FFB2FF', '#68EAFF', '#00F8DF'],
        plugins: {
            //TODO: Olhar isso depois
            // tooltip: {
            //     callbacks: {
            //         label: function (tooltipItem: any, data: any) {
            //             console.log('DENTRO DO TOOLTIPS ;)');
            //             console.log(tooltipItem);
            //             const dataset: any = data.datasets[tooltipItem.datasetIndex];
            //             var total: any = dataset.data.reduce(function (
            //                 previousValue: any,
            //                 currentValue: any,
            //                 currentIndex: any,
            //                 array: any
            //             ) {
            //                 return previousValue + currentValue;
            //             });
            //             var currentValue: any = dataset.data[tooltipItem.index];
            //             var percentage: any = Math.floor((currentValue / total) * 100 + 0.5);
            //             return percentage + '%';
            //         }
            //     }
            // },
            legend: {
                display: false
            }
        }
    };
    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartLegend: boolean = false;
    public barChartData: any[] = [{ data: [], label: 'Compras por estado' }];

    public constructor(private readonly toast: ToastService) {}

    public ngOnInit(): void {
        // no content
    }

    public async ngOnChanges(changes: SimpleChanges): Promise<void> {
        if (changes['isLoading'] && changes['isLoading'].currentValue === false) {
            this.initializeData();
        }
    }

    public ngOnDestroy(): void {
        BroadcastService.dispose(this);
    }

    public async initializeData(): Promise<void> {
        this.isLoading = true;
        this.filterAndMapStates();
        this.groupStatesByRegion();
        this.buildChart();
    }

    public filterAndMapStates(): void {
        this.resetStates();
        for (const customer of this.data) {
            const stateIndex: number = this.states.findIndex((state: StateChartValues) => {
                return state.name === customer.state;
            });
            if (stateIndex === -1) {
                this.states.push({ name: customer.state, count: 1 });
                continue;
            }
            this.states[stateIndex].count += 1;
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
        this.currentRegionTitle = this.regions[this.currentRegionIndex][0].title;
        this.barChartLabels = this.regions[this.currentRegionIndex][1].map((value: StateChartValues) => value.name);
        this.barChartData[0].data = this.regions[this.currentRegionIndex][1].map((value: StateChartValues) =>
            this.ruleOfThree(value.count)
        );
    }

    public navigateForward(): void {
        this.currentRegionIndex = (this.regions.length + this.currentRegionIndex + 1) % this.regions.length;
        this.currentRegionTitle = this.regions[this.currentRegionIndex][0].title;
        this.barChartLabels = this.regions[this.currentRegionIndex][1].map((value: StateChartValues) => value.name);
        this.barChartData[0].data = this.regions[this.currentRegionIndex][1].map((value: StateChartValues) =>
            this.ruleOfThree(value.count)
        );
    }

    public buildChart(): void {
        this.barChartLabels = [];
        this.barChartData[0].data = [];
        this.currentRegionTitle = this.regions[this.currentRegionIndex][0].title;
        this.regions[this.currentRegionIndex][1].forEach((state: StateChartValues) => {
            this.barChartLabels.push(state.name.toString());
            this.barChartData[0].data.push(this.ruleOfThree(state.count));
        });
        this.isLoading = false;
    }

    public setEvents(): void {
        // BroadcastService.subscribe(this, 'refresh-report', async (period: ReportPeriod) => {
        //     this.reportRequest.period = period;
        //     await this.initializeData();
        // });
    }

    public resetStates(): void {
        this.states = [];
    }

    public ruleOfThree(value: any): string {
        return ((value * 100) / this.data.length).toFixed(1);
    }
}

class StateChartKeys {
    public declare id: Regions;
    public declare title: string;
}

class StateChartValues {
    public declare name: string;
    public declare count: number;
}

export enum Regions {
    North,
    Northeast,
    Midwest,
    Southeast,
    South
}
