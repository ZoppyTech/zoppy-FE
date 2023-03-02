import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { UserRequest } from 'src/shared/models/requests/user/user.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-my-company-user-config',
    templateUrl: './my-company-user-config.component.html',
    styleUrls: ['./my-company-user-config.component.scss']
})
export class MyCompanyUserConfigComponent implements OnInit {
    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly toast: ToastService,
        private readonly confirmActionService: ConfirmActionService,
        private readonly router: Router
    ) {}

    public id: string = '';
    public user: UserEntity = new UserEntity();
    public loading: boolean = false;
    public loaded: boolean = false;
    public confirmPassword: string = '';

    public ngOnInit() {
        this.route.paramMap.subscribe(async (paramMap: any) => {
            this.id = paramMap.get('id');
            if (!this.id) this.loaded = true;
            else await this.fetchUser();
            this.setBreadcrumb();
        });
        this.sideMenuService.change(`myCompany`);
        this.sideMenuService.changeSub(`myCompanyUsers`);
    }

    public getSaveDisabled(): boolean {
        const invalidCreate: boolean =
            !this.user.name || !this.user.phone || !this.user.email || !this.user.password || this.user.password !== this.confirmPassword;
        const invalidUpdate: boolean = !this.user.name || !this.user.phone || !this.user.email;
        return this.id ? invalidUpdate : invalidCreate;
    }

    public async fetchUser(): Promise<void> {
        this.loaded = false;
        if (!this.id) return;
        try {
            this.user = await this.userService.find(this.id);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possivel obter o usuário');
        } finally {
            this.loaded = true;
        }
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: UserRequest = {
                email: this.user.email,
                name: this.user.name,
                phone: this.user.phone,
                nickName: this.user.nickName,
                birthDate: this.user.birthDate
            };
            if (!this.id) request.password = this.user.password;
            const response: UserEntity = this.id ? await this.userService.update(this.id, request) : await this.userService.create(request);
            this.user = response;
            this.toast.success(`Informações atualizadas com sucesso`, `Sucesso!`);
            this.router.navigate([Navigation.routes.myCompanyUsers]);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            const message: string = this.id ? 'Não foi possivel atualizar o usuário' : 'Não foi possivel criar o usuário';
            this.toast.error(ex.message, message);
        } finally {
            this.loading = false;
        }
    }

    private setBreadcrumb(): void {
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
            },
            {
                name: this.id ? 'Edição' : 'Criação',
                route: this.id ? `/dashboard/my-company/users/config/${this.id}` : `/dashboard/my-company/users/config`
            }
        ];
    }
}