import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@lucarrloliveira/toast';
import { SendResetPasswordRequest } from 'src/shared/models/requests/public/send-request-password.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    public loading: boolean = false;
    public sent: boolean = false;
    public emailField: Field = {
        errors: [],
        model: '',
        icon: 'icon-alternate_email'
    };

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router
    ) {}

    public ngOnInit() {
        this.initForm();
    }

    public async resetPassword(): Promise<void> {
        try {
            this.loading = true;
            const request: SendResetPasswordRequest = {
                email: this.emailField.model
            };
            debugger;
            const response: boolean = await this.publicService.sendResetPasswordEmail(request);
            debugger;
            if (response) this.sent = true;
        } catch (ex: any) {
            this.emailField.errors = ['error'];
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.loading = false;
        }
    }

    public goBack(): void {
        this.router.navigate([Navigation.routes.login]);
    }

    private initForm(): void {
        const form: any = document.getElementById('resetPasswordForm');
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
