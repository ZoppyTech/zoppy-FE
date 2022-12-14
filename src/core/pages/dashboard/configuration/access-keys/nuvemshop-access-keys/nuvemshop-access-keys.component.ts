import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { NuvemshopKeyService } from 'src/shared/services/nuvemshop-key/nuvemshop-key.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../../dashboard.base.page';

@Component({
    selector: 'app-access-keys',
    templateUrl: './access-keys.component.html',
    styleUrls: ['./access-keys.component.scss']
})
export class NuvemshopAccessKeysComponent extends DashboardBasePage implements OnInit {
    public loading: boolean = false;
    public sendWebhook: boolean = true;
    public wcKey: wcKeyRequest = {};

    public constructor(
        private readonly toast: ToastService,
        private readonly nuvemshopKeyService: NuvemshopKeyService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage,
        private route: ActivatedRoute,
        private router: Router
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.setCodeFromUrl();
        await this.createKey();
    }

    public async createKey(): Promise<void> {
        try {
            this.wcKey = ((await this.nuvemshopKeyService.create(this.wcKey)) as wcKeyRequest) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu token de acesso');
        } finally {
            this.router.navigate(['/dashboard/home']);
        }
    }

    private setCodeFromUrl(): void {
        this.route.queryParams.subscribe((params: nuvemshopCode) => {
            this.wcKey.key = params.code;
        });
    }
}

export interface nuvemshopCode {
    code?: string;
}
