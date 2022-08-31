import { Component, OnInit } from '@angular/core';
import { ToastService } from '@lucarrloliveira/toast';
import { WcKeyEntity } from 'src/shared/models/entities/wc-key.entity';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';

@Component({
    selector: 'app-access-keys',
    templateUrl: './access-keys.component.html',
    styleUrls: ['./access-keys.component.scss']
})
export class AccessKeysComponent implements OnInit {
    public key: wcKeyRequest = {};
    public loading: boolean = false;

    public constructor(
        private readonly toast: ToastService,
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private readonly wcKeyService: WcKeyService
    ) {}

    public async ngOnInit() {
        this.setBreadcrumb();
        this.sideMenuService.changeSub(`access-keys`);
        await this.fetchData();
    }

    public async save(): Promise<void> {
        try {
            this.loading = true;
            const request: wcKeyRequest = {
                id: this.key.id,
                secret: this.key.secret,
                key: this.key.key,
                url: this.key.url
            };
            const response: WcKeyEntity = this.key.id ? await this.wcKeyService.update(request) : await this.wcKeyService.create(request);
            this.key = response as wcKeyRequest;
            this.toast.success(`Informações salvas!`, `Sucesso!`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvas as informações');
        } finally {
            this.loading = false;
        }
    }

    public getSaveDisabled(): boolean {
        return !this.key.key || !this.key.secret || !this.key.url;
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
                route: undefined
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Tokens de Acesso`,
                route: `/dashboard/configurations/access-keys`
            }
        ];
    }
}
