import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../../dashboard.base.page';

@Component({
    selector: 'app-access-keys',
    templateUrl: './access-keys.component.html',
    styleUrls: ['./access-keys.component.scss']
})
export class NuvemshopAccessKeysComponent extends DashboardBasePage implements OnInit {
    public key: wcKeyRequest = {};
    public loading: boolean = false;
    public sendWebhook: boolean = true;

    public constructor(
        private readonly toast: ToastService,
        private readonly wcKeyService: WcKeyService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage
    ) {
        super(storage);
    }

    public async ngOnInit() {
        await this.createKey();
    }

    public async createKey(): Promise<void> {
        try {
            this.key = ((await this.wcKeyService.find()) as wcKeyRequest) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu token de acesso');
        }
    }
}
