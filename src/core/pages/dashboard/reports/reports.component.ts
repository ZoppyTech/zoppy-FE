import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReportPeriod } from 'src/shared/models/requests/report/get-report.request';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public view: View = '1';
    public items: Array<Item> = [
        {
            label: 'Dashboard inicial',
            value: '1'
        },
        {
            label: 'Matriz RFM',
            value: '2'
        }
    ];

    public periods: Array<PeriodItem> = [
        {
            label: 'Últimos 30 dias',
            selected: true,
            value: 30
        },
        {
            label: 'Últimos 60 dias',
            selected: false,
            value: 60
        },
        {
            label: 'Últimos 90 dias',
            selected: false,
            value: 90
        },
        {
            label: 'Todas',
            selected: false,
            value: 'all'
        }
    ];

    public periodMenuOpen: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public route: ActivatedRoute,
        public router: Router
    ) {
        this.view = (this.route.snapshot.paramMap.get('tab') as any) ?? ('1' as View);
    }

    public async ngOnInit() {
        this.sideMenuService.change(`reports`);
        this.setBreadcrumb();
    }

    public selectPeriod(period: PeriodItem) {
        this.periods.forEach((periodItem: PeriodItem) => {
            periodItem.selected = periodItem.value === period.value;
        });
        this.periodMenuOpen = false;
        BroadcastService.emit('refresh-report', period.value);
    }

    public selectReport(period: ReportPeriod): void {
        this.router.navigate([Navigation.routes.reports, period.toString()]);

        setTimeout(() => {
            BroadcastService.emit('refresh-report', this.getPeriod());
        }, 300);
    }

    public getPeriod(): ReportPeriod {
        return this.periods.find((period: PeriodItem) => period.selected)?.value ?? 30;
    }

    public periodSelectedLabel(): string {
        return this.periods.find((period: PeriodItem) => period.selected)?.label ?? '';
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Relatórios`,
                route: undefined
            }
        ];
    }
}

type View = '1' | '2';
class Item {
    public declare label: string;
    public declare value: View;
}

class PeriodItem {
    public declare label: string;
    public declare value: ReportPeriod;
    public declare selected: boolean;
}
