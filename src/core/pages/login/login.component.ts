import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@lucarrloliveira/toast';
import { CarrosselItem } from 'src/shared/components/carrossel/carrossel.component';
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
    public emailField: Field = {
        errors: [],
        model: '',
        icon: 'icon-alternate_email'
    };
    public passwordField: Field = {
        errors: [],
        model: '',
        icon: 'icon-lock'
    };
    public loading: boolean = false;

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly storage: Storage,
        private readonly router: Router
    ) {}

    public ngOnInit() {
        this.initForm();
    }

    public async login(): Promise<void> {
        try {
            this.loading = true;
            const request: LoginRequest = {
                email: this.emailField.model,
                password: this.passwordField.model
            };
            const response: LoginResponse = await this.publicService.login(request);
            this.storage.setCompany(response.company as CompanyEntity);
            this.storage.setUser(response.user as UserEntity);
            this.storage.setToken(response.token as string);
            this.router.navigate([Navigation.routes.dashboard]);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.emailField.errors = ['error'];
            this.passwordField.errors = ['error'];
            this.toast.error(ex.message, 'Não foi possível efetuar o login');
        } finally {
            this.loading = false;
        }
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
    public model: string = '';
    public icon: string = '';
}
