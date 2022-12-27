import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { SyncRequest } from 'src/shared/models/requests/wc-sync/wc-sync.request';
import { BooleanResponse, ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { ShopifySyncService } from 'src/shared/services/shopify-sync/shopify-sync.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';
import { WcSyncService } from 'src/shared/services/wc-sync/wc-sync.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../dashboard.base.page';

@Component({
    selector: 'app-sync-data',
    templateUrl: './sync-data.component.html',
    styleUrls: ['./sync-data.component.scss']
})
export class SyncDataComponent extends DashboardBasePage implements OnInit {
    public key: wcKeyRequest | undefined = undefined;
    public loading: boolean = false;
    public expirationDate: Date | undefined = undefined;
    public steppers: Array<Stepper> = [];

    public loaded: boolean = false;
    public loadingClean: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage,
        private readonly wcSyncDataService: WcSyncService,
        private readonly shopifySyncDataService: ShopifySyncService,
        private readonly wcKeyService: WcKeyService,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService,
        private readonly wcSyncService: WcSyncService
    ) {
        super(storage);
    }

    public async clean(): Promise<void> {
        this.confirmAction.open(
            'Apagar todos os dados',
            'Tem certeza que deseja deletar todos os dados dessa Empresa? Caso tenha integraçao com qualquer E-commerce a importação de dados deverá ser refeita',
            async (result: boolean) => {
                if (!result) return;
                try {
                    this.loadingClean = true;
                    await this.wcSyncService.clean();
                    this.toast.success('Dados removidos com sucesso', 'Remoção concluída!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Erro!');
                } finally {
                    this.loadingClean = false;
                }
            }
        );
    }

    public async ngOnInit() {
        this.setBreadcrumbItems();
        this.setSteppers();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`syncData`);
        await this.fetchKey();
        this.loaded = true;
    }

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Para que serve a sincronização?',
            button: 'Entendi',
            description:
                'Serve para que possamos ser uma ferramente que automatiza tudo e não te da nenhum trabalho no dia a dia. <br> Essa sincronização auxilia na criação de dashboards mais personalizados. Basta deixar todas as caixas preenchidas, sincronizar e ver a mágina acontecer!'
        });
    }

    public async fetchKey(): Promise<void> {
        try {
            this.key = ((await this.wcKeyService.find()) as wcKeyRequest) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu token de acesso');
        }
    }

    public async syncData(): Promise<void> {
        this.loading = true;
        const request: SyncRequest = {
            after: this.expirationDate as Date
        };
        await this.syncCustomers(request);
        await this.syncProducts(request);
        await this.syncCupons(request);
        await this.syncOrders(request);
        const allSuccess: boolean = !this.steppers.find((step: Stepper) => step.state !== 'success');
        this.loading = false;

        if (allSuccess)
            this.modal.open(Modal.IDENTIFIER.INFO, {
                title: 'Sucesso!',
                button: 'Entendi',
                description: `<b>Todas as sincronizações foram agendadas!</b> Você receberá um email confirmando a conclusão de cada sincronização solicitada..`
            });
    }

    public getStepIndex(step: Stepper): number {
        const filteredSteps: Array<Stepper> = this.steppers.filter((step: Stepper) => step.visible);
        return filteredSteps.indexOf(step) + 1;
    }

    private async syncCustomers(request: SyncRequest): Promise<void> {
        try {
            if (!this.isVisible('customer')) return;
            this.setInProgress('customer');
            const result: BooleanResponse = this.getIsWooCommerce()
                ? await this.wcSyncDataService.syncCustomers(request)
                : await this.shopifySyncDataService.syncCustomers(request);
            this.setResult(result.result, `customer`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro!');
            this.setResult(false, `customer`);
        }
    }

    private async syncProducts(request: SyncRequest): Promise<void> {
        try {
            if (!this.isVisible('product')) return;
            this.setInProgress('product');
            const result: BooleanResponse = this.getIsWooCommerce()
                ? await this.wcSyncDataService.syncProducts(request)
                : await this.shopifySyncDataService.syncProducts(request);
            this.setResult(result.result, `product`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro!');
            this.setResult(false, `product`);
        }
    }

    private async syncCupons(request: SyncRequest): Promise<void> {
        try {
            if (!this.isVisible('coupon')) return;
            this.setInProgress('coupon');
            const result: BooleanResponse = this.getIsWooCommerce()
                ? await this.wcSyncDataService.syncCoupons(request)
                : await this.shopifySyncDataService.syncCoupons(request);
            this.setResult(result.result, `coupon`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro!');
            this.setResult(false, `coupon`);
        }
    }

    private async syncOrders(request: SyncRequest): Promise<void> {
        try {
            if (!this.isVisible('order')) return;
            this.setInProgress('order');
            const result: BooleanResponse = this.getIsWooCommerce()
                ? await this.wcSyncDataService.syncOrders(request)
                : await this.shopifySyncDataService.syncOrders(request);
            this.setResult(result.result, `order`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve um erro!');
            this.setResult(false, `order`);
        }
    }

    private isVisible(entity: SyncEntity): boolean {
        return this.steppers.find((step: Stepper) => step.id === entity)?.visible ?? false;
    }

    private setResult(result: boolean, entity: SyncEntity) {
        this.steppers.forEach((stepper: Stepper) => {
            if (stepper.id === entity) {
                stepper.state = result ? 'success' : 'error';
            }
        });
    }

    private setInProgress(entity: SyncEntity) {
        this.steppers.forEach((stepper: Stepper) => {
            if (stepper.id === entity) {
                stepper.state = 'in-progress';
            }
        });
    }

    private setBreadcrumbItems(): void {
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
                name: `Sincronização`,
                route: Navigation.routes.syncData
            }
        ];
    }

    private setSteppers(): void {
        this.steppers = [
            {
                label: 'Sincronização de clientes',
                state: 'waiting',
                visible: true,
                id: 'customer'
            },
            {
                label: 'Sincronização de produtos',
                state: 'waiting',
                visible: true,
                id: 'product'
            },
            {
                label: 'Sincronização de cupons',
                state: 'waiting',
                visible: true,
                id: 'coupon'
            },
            {
                label: 'Sincronização de pedidos',
                state: 'waiting',
                visible: true,
                id: 'order'
            }
        ];
    }
}

interface Stepper {
    state: ResultType;
    label: string;
    visible: boolean;
    id: SyncEntity;
}

type ResultType = 'success' | 'waiting' | 'in-progress' | 'error';
type SyncEntity = 'customer' | 'coupon' | 'product' | 'order';
