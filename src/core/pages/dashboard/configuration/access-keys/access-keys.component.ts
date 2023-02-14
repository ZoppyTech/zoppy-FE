import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants } from '@ZoppyTech/utilities';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WcKeyEntity } from 'src/shared/models/entities/wc-key.entity';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { NuvemshopSyncService } from 'src/shared/services/nuvemshop-sync/nuvemshop-sync.service';
import { ShopifySyncService } from 'src/shared/services/shopify-sync/shopify-sync.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';
import { WcWebhookService } from 'src/shared/services/wc-webhook/wc-webhook.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../dashboard.base.page';

@Component({
    selector: 'app-access-keys',
    templateUrl: './access-keys.component.html',
    styleUrls: ['./access-keys.component.scss']
})
export class AccessKeysComponent extends DashboardBasePage implements OnInit {
    public key: wcKeyRequest = {};
    public loading: boolean = false;
    public sendWebhook: boolean = true;
    public adminVariables: AdminVariables = {
        label: '',
        placeholder: ''
    };

    public constructor(
        private readonly toast: ToastService,
        private readonly wcKeyService: WcKeyService,
        private readonly wcWebhookService: WcWebhookService,
        private readonly shopifySyncService: ShopifySyncService,
        private readonly nuvemshopSyncService: NuvemshopSyncService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.setBreadcrumb();
        this.sideMenuService.changeSub(`accessKeys`);
        this.sideMenuService.change('configurations');
        await this.setAdminVariables();
        await this.fetchData();
    }

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Cadastrando suas chaves de Acesso?',
            button: 'Entendi',
            description: `Aqui é quando acontece a permissão para que possamos criar cupons personalizados para seus clientes sem te dar trabalho manual. Lembrando que toda essa criação vai de acordo com o modelo que você desejar de giftback e é <b>totalmente transparente</b>, sempre de forma <b>automatizada!</b>`
        });
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: wcKeyRequest = {
                id: this.key.id,
                secret: this.key.secret,
                key: this.key.key,
                url: this.key.url,
                admin: this.key.admin
            };
            const response: WcKeyEntity = this.key.id ? await this.wcKeyService.update(request) : await this.wcKeyService.create(request);
            this.key = response as wcKeyRequest;
            await this.syncWebhooks();
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar as informações');
        } finally {
            this.loading = false;
        }
    }

    private async syncWebhooks(): Promise<void> {
        if (!this.sendWebhook) return;
        if (this.isWooCommerce) await this.wcWebhookService.syncWebhooks();
        if (this.isShopify) await this.shopifySyncService.syncWebhooks();
        if (this.isNuvemshop) await this.nuvemshopSyncService.syncWebhooks();
    }

    public getSaveDisabled(): boolean {
        switch (this.storage.getCompany()?.provider) {
            case AppConstants.PROVIDERS.TRAY:
                return !this.key.admin || !this.key.url;
            default:
                return !this.key.key || !this.key.secret || !this.key.url;
        }
    }

    public async fetchData(): Promise<void> {
        try {
            this.key = ((await this.wcKeyService.find()) as wcKeyRequest) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu token de acesso');
        }
    }

    public copyToClipboard(value: string): void {
        navigator.clipboard.writeText((this.key as any)[value]);
        this.toast.success('Texto copiado para a área de transferência', `Copiado!`);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Chaves de Acesso`,
                route: Navigation.routes.accessKeys
            }
        ];
    }

    private setAdminVariables(): void {
        switch (this.storage.getCompany()?.provider) {
            case AppConstants.PROVIDERS.SHOPIFY:
                this.adminVariables = {
                    label: 'Admin Token',
                    placeholder: 'Insira aqui seu Admin Token'
                };
                break;
            case AppConstants.PROVIDERS.TRAY:
                this.adminVariables = {
                    label: 'Code',
                    placeholder: 'Insira aqui seu Code'
                };
                break;
        }
    }
}

interface AdminVariables {
    label: string;
    placeholder: string;
}
