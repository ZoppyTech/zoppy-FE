import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@lucarrloliveira/toast';
import { ResetPasswordRequest } from 'src/shared/models/requests/public/reset-password.request';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-change-password',
    templateUrl: './change-password.component.html',
    styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    public loading: boolean = false;
    public token: string = '';
    public passwordField: Field = {
        errors: [],
        model: '',
        icon: 'icon-lock',
        placeholder: 'Digite sua senha'
    };
    public passwordConfirmationField: Field = {
        errors: [],
        model: '',
        icon: 'icon-lock',
        placeholder: 'Digite novamente sua senha'
    };

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.initForm();
        this.route.paramMap.subscribe((paramMap: any) => {
            this.token = paramMap.get('token');
        });
    }

    public async changePassword(): Promise<void> {
        if (!this.validFields()) {
            return;
        }

        try {
            this.loading = true;
            const request: ResetPasswordRequest = {
                newPassword: this.passwordField.model,
                hash: this.token
            };
            await this.publicService.resetPassword(request);
            this.toast.success('Senha atualizada com sucesso!', 'Tudo certo');
            this.goBack();
        } catch (ex: any) {
            this.passwordField.errors = ['error'];
            this.passwordConfirmationField.errors = ['error'];
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.loading = false;
        }
    }

    public goBack(): void {
        this.router.navigate([Navigation.routes.login]);
    }

    private validFields(): boolean {
        if (
            !this.passwordConfirmationField.model ||
            !this.passwordField.model ||
            this.passwordConfirmationField.model !== this.passwordField.model
        ) {
            this.passwordField.errors = ['error'];
            this.passwordConfirmationField.errors = ['error'];
            this.toast.error('Campos de senha não conferem', 'Erro');
            return false;
        }

        return true;
    }

    private initForm(): void {
        const form: any = document.getElementById('changePasswordForm');
        form.addEventListener('submit', (event: any) => {
            event.preventDefault();
        });
    }
}

class Field {
    public errors: string[] = [];
    public model: string = '';
    public icon: string = '';
    public placeholder: string = '';
}
