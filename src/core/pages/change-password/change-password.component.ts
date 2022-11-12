import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
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
    public fields: Field[] = [];

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.initForm();
        this.initFields();
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
                newPassword: this.fields[0].model.toString(),
                hash: this.token
            };
            await this.publicService.resetPassword(request);
            this.toast.success('Senha atualizada com sucesso!', 'Tudo certo');
            this.goBack();
        } catch (ex: any) {
            this.fields[0].errors = ['error'];
            this.fields[1].errors = ['error'];
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.loading = false;
        }
    }

    public goBack(): void {
        this.router.navigate([Navigation.routes.login]);
    }

    private initFields(): void {
        this.fields = [
            {
                errors: [],
                model: '',
                icon: 'icon-lock',
                placeholder: 'Digite sua senha',
                title: 'Nova senha',
                type: 'password'
            },
            {
                errors: [],
                model: '',
                icon: 'icon-lock',
                placeholder: 'Digite novamente sua senha',
                title: 'Confirme sua nova senha',
                type: 'password'
            }
        ];
    }

    private validFields(): boolean {
        if (!this.fields[1].model || !this.fields[0].model || this.fields[1].model !== this.fields[0].model) {
            this.fields[0].errors = ['error'];
            this.fields[1].errors = ['error'];
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
    public model: string | number = '';
    public icon: string = '';
    public placeholder: string = '';
    public title: string = '';
    public type: string = '';
}
