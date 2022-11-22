import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
        try {
            const [user, company] = await Promise.all([this.userService.myself(), this.companyService.find()]);
            if (user) this.storage.setUser(user);
            if (company) this.storage.setCompany(company);
            this.visible = true;
        } catch (ex) {
            this.storage.clearAll();
            this.router.navigate([Navigation.routes.login]);
        }
    }
}
