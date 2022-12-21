import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';

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
        public toast: ToastService,
        private readonly confirmActionService: ConfirmActionService,
        private readonly router: Router
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
        this.sideMenuService.change(`myCompany`);
        this.sideMenuService.changeSub(`myCompanyUsers`);
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
