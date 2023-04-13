import { ToastService } from '@ZoppyTech/toast';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-blocked',
    templateUrl: './blocked.component.html',
    styleUrls: ['./blocked.component.scss']
})
export class BlockedComponent {
    public constructor(private readonly router: Router, private readonly toast: ToastService, private readonly storage: Storage) {}

    public goToConfig(): void {
        const company: CompanyEntity = this.storage.getCompany() as CompanyEntity;
        const state: number = company?.vindiId && company?.vindiPaymentProfileId ? 3 : 2;
        this.toast.alert('Insira suas informações de pagamento!', 'Pagamento');
        this.router.navigate([Navigation.routes.signature, state.toString()]);
    }
}
