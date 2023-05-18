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
    public fields: Field[] = [];

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
            this.setFields();
        });
        this.sideMenuService.change(`myCompany`);
        this.sideMenuService.changeSub(`myCompanyUsers`);
    }

    public getSaveDisabled(): boolean {
        const invalidCreate: boolean =
            !this.getById('name').model ||
            !this.getById('phone').model ||
            !this.getById('email').model ||
            !this.getById('password').model ||
            this.getById('password').model !== this.getById('confirmPassword').model;
        const invalidUpdate: boolean = !this.getById('name').model || !this.getById('phone').model || !this.getById('email').model;
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
                email: this.getById('email').model,
                name: this.getById('name').model,
                phone: this.getById('phone').model,
                revenueRecord: this.getById('revenueRecord').model,
                nickName: this.getById('nickName').model,
                birthDate: this.getById('birthDate').model
            };
            if (!this.id) request.password = this.getById('password').model;
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

    public iconClicked(field: Field): void {
        field.type = field.type === 'password' ? 'text' : 'password';
        field.icon = field.type === 'password' ? 'icon-visibility' : 'icon-visibility_off';
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

    private getById(id: FieldType): Field {
        return this.fields.find((field: Field) => field.id === id) as Field;
    }

    private setFields(): void {
        this.fields = [
            {
                errors: [],
                model: this.user.name,
                id: 'name',
                title: 'Nome*',
                type: 'text',
                inputType: 'input',
                onChange: () => {},
                placeholder: 'Digite o nome',
                visible: true
            },
            {
                errors: [],
                model: this.user.phone,
                id: 'phone',
                title: 'Telefone Celular*',
                type: 'text',
                inputType: 'input',
                onChange: () => {},
                mask: '(00) 00000-0000',
                placeholder: 'Digite o telefone',
                visible: true
            },
            {
                errors: [],
                model: this.user.email,
                id: 'email',
                title: 'Email*',
                type: 'email',
                inputType: 'input',
                onChange: () => {},
                placeholder: 'Digite o email',
                visible: true
            },
            {
                errors: [],
                model: this.user.revenueRecord,
                id: 'revenueRecord',
                title: 'CPF*',
                type: 'text',
                inputType: 'input',
                mask: '000.000.000-00',
                onChange: () => {},
                placeholder: 'Digite o seu CPF',
                visible: true
            },
            {
                errors: [],
                model: this.user.nickName,
                id: 'nickName',
                title: 'Apelido',
                type: 'text',
                inputType: 'input',
                onChange: () => {},
                placeholder: 'Digite o apelido',
                visible: true
            },
            {
                errors: [],
                model: this.user.birthDate,
                id: 'birthDate',
                title: 'Data de nascimento',
                type: 'input',
                inputType: 'datepicker',
                onChange: () => {},
                placeholder: 'DD/MM/YYYY',
                visible: true
            },
            {
                errors: [],
                model: this.user.password,
                id: 'password',
                title: 'Senha*',
                type: 'password',
                inputType: 'input',
                onChange: () => {},
                placeholder: 'Digite a senha do usuário',
                icon: 'icon-visibility_off',
                visible: !this.id
            },
            {
                errors: [],
                model: this.confirmPassword,
                id: 'confirmPassword',
                title: 'Confirmar Senha*',
                type: 'password',
                inputType: 'input',
                onChange: () => {},
                placeholder: 'Confirme a senha do usuário',
                icon: 'icon-visibility_off',
                visible: !this.id
            }
        ];
    }
}

class Field {
    public errors: string[] = [];
    public model: any = '';
    public icon?: string = '';
    public placeholder: string = '';
    public title: string = '';
    public type: string = '';
    public mask?: string = '';
    public class?: string = '';
    public id?: FieldType = undefined;
    public declare inputType: InputType;
    public options?: Array<any> = [];
    public onChange: any;
    public visible: boolean = true;
}

type FieldType = 'name' | 'phone' | 'email' | 'revenueRecord' | 'nickName' | 'birthDate' | 'password' | 'confirmPassword';
type InputType = 'input' | 'datepicker';
