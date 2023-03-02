import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants } from '@ZoppyTech/utilities';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { DashboardResponse } from 'src/shared/models/responses/dashboard/dashboard.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { DashboardService } from 'src/shared/services/dashboard/dashboard.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation, Pages } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        private readonly dashboardService: DashboardService,
        private readonly toast: ToastService,
        private readonly router: Router
    ) {}

    public user: UserEntity = new UserEntity();
    public dashboard: DashboardResponse = new DashboardResponse();
    public items: Array<Item> = [];
    public cards: Array<Card> = [];
    public posts: Array<Post> = [];
    public visiblePost: number = 0;
    public percent: number = 0;

    public async ngOnInit() {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.redirect();
        this.sideMenuService.change(`home`);
        this.setBreadcrumb();
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            }
        ];
    }

    private redirect(): void {
        switch (this.user.role) {
            case AppConstants.ROLES.COMMON:
                this.router.navigate([Navigation.routes.salesPanel]);
                break;
            case AppConstants.ROLES.ADMIN:
            case AppConstants.ROLES.MASTER:
            case AppConstants.ROLES.MANAGER:
                this.router.navigate([Navigation.routes.reports]);
                break;
        }
    }
}

interface Item {
    title: string;
    label: string;
    completed: boolean;
    route?: Pages | undefined;
}

interface Card {
    value: string;
    title: string;
    image: string;
    imageMobile: string;
}

interface Post {
    title: string;
    image: string;
}
