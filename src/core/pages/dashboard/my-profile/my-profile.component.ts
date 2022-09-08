import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from '@lucarrloliveira/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { UserRequest } from 'src/shared/models/requests/user/user.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-my-profile',
    templateUrl: './my-profile.component.html',
    styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly toast: ToastService,
        private readonly storage: Storage
    ) {}

    public user: UserEntity = new UserEntity();
    public loading: boolean = false;

    public ngOnInit() {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.setBreadcrumb();
        this.sideMenuService.change(`my-profile`);
        this.sideMenuService.changeSub(`none`);
    }

    public getSaveDisabled(): boolean {
        return !this.user.name || !this.user.phone || !this.user.email;
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: UserRequest = {
                email: this.user.email,
                name: this.user.name,
                phone: this.user.phone,
                birthDate: this.user.birthDate
            };
            const response: UserEntity = await this.userService.update(this.user.id, request);
            this.storage.setUser(response);
            this.user = response;
            this.toast.success(`Informações atualizadas com sucesso`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível atualizar seu usuário');
        } finally {
            this.loading = false;
        }
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Meu Perfil`,
                route: '/dashboard/profile'
            }
        ];
    }
}
