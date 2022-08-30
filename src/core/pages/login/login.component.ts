import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@lucarrloliveira/toast';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { LoginRequest } from 'src/shared/models/requests/public/login.request';
import { LoginResponse } from 'src/shared/models/responses/public/login.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    public fields: Field[] = [];
    public loading: boolean = false;
    public email: string = '';

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly storage: Storage,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.route.paramMap.subscribe((paramMap: any) => {
            this.email = paramMap.get('email') ?? '';
        });
        this.initFields();
        this.initForm();
    }

    public async login(): Promise<void> {
        try {
            this.loading = true;
            const request: LoginRequest = {
                email: this.fields[0].model.toString(),
                password: this.fields[1].model.toString()
            };
            const response: LoginResponse = await this.publicService.login(request);
            this.publicService.handleLoginSuccess(response);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.fields[0].errors = ['error'];
            this.fields[1].errors = ['error'];
            this.toast.error(ex.message, 'Não foi possível efetuar o login');
        } finally {
            this.loading = false;
        }
    }

    private initFields(): void {
        this.fields = [
            {
                errors: [],
                model: this.email,
                icon: 'icon-alternate_email',
                title: 'E-mail',
                placeholder: 'Digite seu e-mail',
                type: 'email'
            },
            {
                errors: [],
                model: '',
                icon: 'icon-lock',
                title: 'Senha',
                placeholder: 'Digite sua senha',
                type: 'password'
            }
        ];
    }

    private initForm(): void {
        const form: any = document.getElementById('loginForm');
        form.addEventListener('submit', (event: any) => {
            event.preventDefault();
        });
    }
}

class Field {
    public errors: string[] = [];
    public model: string | number = '';
    public icon: string = '';
    public title: string = '';
    public type: string = '';
    public placeholder: string = '';
}
