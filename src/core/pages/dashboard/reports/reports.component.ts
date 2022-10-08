import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { DashboardService } from 'src/shared/services/dashboard/dashboard.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation, Pages } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        private readonly dashboardService: DashboardService,
        private readonly toast: ToastService
    ) {}

    public async ngOnInit() {
        this.sideMenuService.change(`reports`);
        this.setBreadcrumb();
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
