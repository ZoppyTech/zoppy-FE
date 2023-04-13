import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooleanResponse } from 'src/shared/services/api.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { CompanyService } from 'src/shared/services/company/company.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public visible: boolean = false;

    public constructor(
        public userService: UserService,
        public companyService: CompanyService,
        public storage: Storage,
        public router: Router
    ) {}

    public async ngOnInit() {
        setTimeout(async () => {
            await this.initialize();
        });
    }

    private async initialize() {
        this.visible = false;
        try {
            const [user, company, isBlocked] = await Promise.all([
                this.userService.myself(),
                this.companyService.find(),
                this.companyService.getBlockedFreeTier()
            ]);
            if (user) this.storage.setUser(user);
            if (company) this.storage.setCompany(company);

            if (isBlocked.result && !this.router.url.includes(Navigation.routes.signature)) {
                this.router.navigate([Navigation.routes.blocked]);
                return;
            }
        } catch (ex) {
            this.storage.clearAll();
            this.router.navigate([Navigation.routes.login]);
        } finally {
            this.visible = true;
        }
    }

    public setEvents(): void {
        BroadcastService.subscribe(this, 'reload-dashboard', async () => {
            await this.initialize();
        });
    }
}
