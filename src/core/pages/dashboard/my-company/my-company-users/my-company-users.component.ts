import { Component, OnInit } from '@angular/core';
import { ToastService } from '@lucarrloliveira/toast';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';

@Component({
    selector: 'app-my-company-users',
    templateUrl: './my-company-users.component.html',
    styleUrls: ['./my-company-users.component.scss']
})
export class MyCompanyUsersComponent implements OnInit {
    public users: Array<UserEntity> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public userService: UserService,
        public toast: ToastService
    ) {}

    public async ngOnInit() {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Minha empresa`,
                route: undefined
            },
            {
                name: `Usuários`,
                route: `/dashboard/my-company/users`
            }
        ];
        this.sideMenuService.change(`my-company`);
        this.sideMenuService.changeSub(`my-company-users`);
        await this.fetchUsers();
    }

    public async fetchUsers(): Promise<void> {
        try {
            this.users = await this.userService.list();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os usuários');
        }
    }
}
