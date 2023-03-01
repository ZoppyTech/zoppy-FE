import { PasswordValidator } from '@ZoppyTech/utilities';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { ZoppyException } from 'src/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
    public user: UserEntity = new UserEntity();
    public loading: boolean = false;
    public fields: Field[] = [];
    public loaded: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private readonly userService: UserService,
        private readonly toast: ToastService,
        private readonly storage: Storage,
        private readonly router: Router
    ) {}

    public ngOnInit() {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.setBreadcrumb();
        this.sideMenuService.change(`none`);
        this.sideMenuService.changeSubAccount(`updatePassword`);
        this.setFields();

        setTimeout(() => {
            this.loaded = true;
        });
    }

    public iconClicked(field: Field): void {
        field.type = field.type === 'password' ? 'text' : 'password';
        field.icon = field.type === 'password' ? 'icon-visibility' : 'icon-visibility_off';
    }

    public async save(): Promise<void> {
        if (this.getById('confirmPassword').model !== this.getById('newPassword').model) {
            this.toast.error('As senhas inseridas não conferem', 'Erro!');
            return;
        }

        if (!PasswordValidator.validate(this.getById('newPassword').model.toString())) {
            this.toast.error('A senha não preenche os requisitos de segurança', 'Erro!');
            return;
        }

        this.loading = true;

        try {
            await this.userService.updatePassword({
                newPassword: this.getById('newPassword').model.toString(),
                oldPassword: this.getById('oldPassword').model.toString()
            });
            this.toast.success('Senha atualizada com sucesso!', 'Tudo certo!');
            this.router.navigate([Navigation.routes.home]);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.loading = false;
        }
    }

    public setDisabled(): boolean {
        return !this.getById('confirmPassword')?.model || !this.getById('oldPassword')?.model || !this.getById('newPassword')?.model;
    }

    private getById(id: FieldType): Field {
        return this.fields.find((field: Field) => field.id === id) as Field;
    }

    private setFields(): void {
        this.fields = [
            {
                errors: [],
                model: '',
                id: 'oldPassword',
                title: 'Senha Atual',
                icon: 'icon-visibility_off',
                placeholder: 'Digite sua senha atual',
                type: 'password',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'newPassword',
                title: 'Nova senha',
                icon: 'icon-visibility_off',
                placeholder: 'Digite a nova senha',
                type: 'password',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'confirmPassword',
                title: 'Confirmar senha',
                placeholder: 'Digite novamente a nova senha',
                icon: 'icon-visibility_off',
                type: 'password',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            }
        ];
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Redefinir senha`,
                route: Navigation.routes.updatePassword
            }
        ];
    }
}

class Field {
    public errors: string[] = [];
    public model: string | number | boolean = '';
    public icon?: string = '';
    public placeholder: string = '';
    public title: string = '';
    public type: string = '';
    public mask?: string = '';
    public class?: string = '';
    public id?: FieldType = undefined;
    public inputType: string = '';
    public options?: Array<any> = [];
    public onChange: any;
}

type FieldType = 'oldPassword' | 'newPassword' | 'confirmPassword';
