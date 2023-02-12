import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants } from '@ZoppyTech/utilities';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { UserRequest } from 'src/shared/models/requests/user/user.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../dashboard.base.page';

@Component({
    selector: 'app-my-company-users',
    templateUrl: './my-company-users.component.html',
    styleUrls: ['./my-company-users.component.scss']
})
export class MyCompanyUsersComponent extends DashboardBasePage implements OnInit {
    public users: Array<UserEntity> = [];
    public roles: Array<Item> = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public userService: UserService,
        public toast: ToastService,
        public override storage: Storage,
        private readonly confirmActionService: ConfirmActionService,
        private readonly router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Minha empresa`,
                route: undefined
            },
            {
                name: `Usuários`,
                route: Navigation.routes.myCompanyUsers
            }
        ];
        this.sideMenuService.change(`myCompany`);
        this.sideMenuService.changeSub(`myCompanyUsers`);
        this.setRoles();
        await this.fetchUsers();
    }

    public async updateUserRole(user: UserEntity): Promise<void> {
        try {
            const request: UserRequest = {
                email: user.email,
                name: user.name,
                phone: user.phone,
                birthDate: user.birthDate,
                nickName: user.nickName,
                role: user.role
            };
            await this.userService.update(user.id, request);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Ação não permitida');
        } finally {
            setTimeout(async () => {
                await this.fetchUsers();
            }, 250);
        }
    }

    public setRoles(): void {
        this.roles = [
            {
                label: this.getRoleLabel(AppConstants.ROLES.ADMIN),
                value: AppConstants.ROLES.ADMIN
            },
            {
                label: this.getRoleLabel(AppConstants.ROLES.MANAGER),
                value: AppConstants.ROLES.MANAGER
            },
            {
                label: this.getRoleLabel(AppConstants.ROLES.COMMON),
                value: AppConstants.ROLES.COMMON
            }
        ];
    }

    public async fetchUsers(): Promise<void> {
        try {
            this.users = await this.userService.list();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter os usuários');
        }
    }

    public getEditHref(user: UserEntity): string {
        return `/dashboard/my-company/users/config/${user.id}`;
    }

    public navigate(user: UserEntity): void {
        this.router.navigate([Navigation.routes.userConfig, user.id]);
    }

    public createUser(): void {
        this.router.navigate([Navigation.routes.userConfig]);
    }

    public async destroy(user: UserEntity): Promise<void> {
        this.confirmActionService.open(
            'Deletar o usuário',
            'Tem certeza que deseja deletar esse usuário? Essa ação nao poderá ser desfeita.',
            async (result: boolean) => {
                if (!result) return;
                try {
                    await this.userService.destroy(user.id as string);
                    await this.fetchUsers();
                    this.toast.success('Esse usuário foi removido e não pode ser mais usado', 'Sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível deletar esse usuário');
                }
            }
        );
    }
}

interface Item {
    label: string;
    value: string;
}
