import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Position } from 'src/shared/models/responses/reports/matrix-rfm.response';
import { ReportCustomerResponse } from 'src/shared/models/responses/reports/report-customer..response';
import { ZoppyException } from 'src/shared/services/api.service';
import { ReportService } from 'src/shared/services/reports/report.service';
import { FormatUtils } from 'src/shared/utils/format.util';

@Component({
    selector: 'app-matrix-rfm',
    templateUrl: './matrix-rfm.component.html',
    styleUrls: ['./matrix-rfm.component.scss']
})
export class MatrixRfmComponent implements OnInit {
    public customers: Array<ReportCustomerResponseDto> = [];
    public isLoading: boolean = true;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public positions: CustomerPositions = new CustomerPositions();

    public constructor(private readonly reportsService: ReportService, private readonly toast: ToastService) {}

    public async ngOnInit(): Promise<void> {
        await this.fetchData();
    }

    public async fetchData(): Promise<void> {
        try {
            this.customers = (await this.reportsService.getCustomers()) as ReportCustomerResponseDto[];
            this.setPositions();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os clientes');
        } finally {
            this.isLoading = false;
        }
    }

    public setPositions(): void {
        this.customers.forEach((customer: ReportCustomerResponse) => {
            switch (customer.matrixRFM?.position) {
                case 'cant-lose':
                    this.positions.cantLose.phones.push(customer.phone);
                    break;
                case 'at-risk':
                    this.positions.atRisk.phones.push(customer.phone);
                    break;
                case 'loyal':
                    this.positions.loyal.phones.push(customer.phone);
                    break;
                case 'champion':
                    this.positions.champion.phones.push(customer.phone);
                    break;
                case 'need-attention':
                    this.positions.needAttention.phones.push(customer.phone);
                    break;
                case 'possible-loyal':
                    this.positions.possibleLoyal.phones.push(customer.phone);
                    break;
                case 'sleeping':
                    this.positions.sleeping.phones.push(customer.phone);
                    break;
                case 'almost-sleeping':
                    this.positions.almostSleeping.phones.push(customer.phone);
                    break;
                case 'promising':
                    this.positions.promising.phones.push(customer.phone);
                    break;
                case 'new':
                    this.positions.new.phones.push(customer.phone);
                    break;
            }
        });
    }

    public calculate(position: CustomerPosition): string {
        const percent: string = FormatUtils.toPercent(position.phones.length / this.customers.length);
        const fraction: string = `${position.phones.length}/${this.customers.length} - `;
        return fraction + percent;
    }

    public setFilter(position: CustomerPosition) {
        this.customers.forEach((customer: ReportCustomerResponseDto) => {
            customer.hidden = customer.matrixRFM?.position !== position.position;
        });
    }
}

class CustomerPositions {
    public cantLose: CustomerPosition = new CustomerPosition('cant-lose');
    public atRisk: CustomerPosition = new CustomerPosition('at-risk');
    public loyal: CustomerPosition = new CustomerPosition('loyal');
    public champion: CustomerPosition = new CustomerPosition('champion');
    public needAttention: CustomerPosition = new CustomerPosition('need-attention');
    public possibleLoyal: CustomerPosition = new CustomerPosition('possible-loyal');
    public sleeping: CustomerPosition = new CustomerPosition('sleeping');
    public almostSleeping: CustomerPosition = new CustomerPosition('almost-sleeping');
    public promising: CustomerPosition = new CustomerPosition('promising');
    public new: CustomerPosition = new CustomerPosition('new');
}

class CustomerPosition {
    public constructor(position: Position) {
        this.position = position;
    }
    public phones: Array<string> = [];
    public position: Position = 'all';
}

class ReportCustomerResponseDto extends ReportCustomerResponse {
    public hidden: boolean = false;
}
