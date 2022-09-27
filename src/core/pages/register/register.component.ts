import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { RegisterRequest } from 'src/shared/models/requests/public/register.request';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';
import { StringUtil } from 'src/shared/utils/string.util';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public fields: Field[] = [];
    public loading: boolean = false;
    public acceptTerms: boolean = false;

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router
    ) {}

    public ngOnInit() {
        this.initFields();
        this.initForm();
    }

    public async register(): Promise<void> {
        const formValid: boolean = this.validateForm();
        if (!this.acceptTerms) {
            this.toast.error('É necessário aceitar os Termos e condições', 'Erro');
            return;
        }
        if (!formValid) {
            this.toast.error('Houveram erros de validação', 'Erro');
            return;
        }

        try {
            this.loading = true;
            const request: RegisterRequest = {
                name: this.fields[0].model.toString(),
                phone: this.fields[1].model.toString(),
                email: this.fields[2].model.toString(),
                companyName: this.fields[2].model.toString(),
                password: this.fields[2].model.toString()
            };
            const thisUser: UserEntity = await this.publicService.register(request);
            this.toast.success('Seu usuário foi registrado com sucesso!', 'Tudo certo!');
            this.goBack(thisUser.email);
        } catch (ex: any) {
            this.fields.forEach((field: Field) => {
                field.errors = ['error'];
            });
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.loading = false;
        }
    }

    public goBack(email: string): void {
        this.router.navigate([Navigation.routes.login, email]);
    }

    private initFields(): void {
        this.fields = [
            {
                errors: [],
                model: '',
                title: 'Nome',
                placeholder: 'Digite seu nome completo',
                type: 'text',
                class: 'half-size'
            },
            {
                errors: [],
                model: '',
                title: 'Telefone',
                placeholder: 'Digite seu telefone',
                type: 'text',
                mask: '(00) 00000-0000',
                class: 'half-size'
            },

            {
                errors: [],
                model: '',
                title: 'E-mail',
                placeholder: 'Digite seu e-mail',
                type: 'email'
            },
            {
                errors: [],
                model: '',
                title: 'Empresa',
                placeholder: 'Digite o nome da sua empresa',
                type: 'text'
            },
            {
                errors: [],
                model: '',
                title: 'Senha',
                placeholder: 'Digite sua senha',
                type: 'password',
                class: 'half-size'
            },
            {
                errors: [],
                model: '',
                title: 'Confirmar senha',
                placeholder: 'Digite novamente sua senha',
                type: 'password',
                class: 'half-size'
            }
        ];
    }

    private initForm(): void {
        const form: any = document.getElementById('registerForm');
        form.addEventListener('submit', (event: any) => {
            event.preventDefault();
        });
    }

    private validateForm(): boolean {
        let countErrors: number = 0;

        this.fields.forEach((field: Field) => {
            if (!field.model) {
                field.errors = ['error'];
                countErrors++;
            }
        });

        if (this.fields[1].model.toString().length !== 11) {
            this.fields[1].errors = ['error'];
            countErrors++;
        }

        if (!StringUtil.validateEmail(this.fields[2].model.toString())) {
            this.fields[2].errors = ['error'];
            countErrors++;
        }

        if (this.fields[5].model !== this.fields[4].model) {
            this.fields[5].errors = ['error'];
            this.fields[4].errors = ['error'];
            countErrors++;
        }

        return countErrors === 0;
    }
}

class Field {
    public errors: string[] = [];
    public model: string | number = '';
    public icon?: string = '';
    public placeholder: string = '';
    public title: string = '';
    public type: string = '';
    public mask?: string = '';
    public class?: string = '';
}
