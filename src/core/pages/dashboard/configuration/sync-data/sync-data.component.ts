import { Component, OnInit } from '@angular/core';
import { ToastService } from '@lucarrloliveira/toast';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { WcSyncRequest } from 'src/shared/models/requests/wc-sync/wc-sync.request';
import { BooleanResponse, ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';
import { WcSyncService } from 'src/shared/services/wc-sync/wc-sync.service';

@Component({
    selector: 'app-sync-data',
    templateUrl: './sync-data.component.html',
    styleUrls: ['./sync-data.component.scss']
})
export class SyncDataComponent implements OnInit {
    public key: wcKeyRequest | undefined = undefined;
    public loading: boolean = false;
    public expirationDate: Date | undefined = undefined;
    public steppers: Array<Stepper> = [];

    public loaded: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private readonly syncDataService: WcSyncService,
        private readonly wcKeyService: WcKeyService,
        private readonly toast: ToastService
    ) {}

    public async ngOnInit() {
        this.setBreadcrumbItems();
        this.setSteppers();
        this.sideMenuService.changeSub(`sync-data`);
        await this.fetchKey();
        this.loaded = true;
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
        const request: WcSyncRequest = {
            after: this.expirationDate as Date
        };
        await this.syncCustomers(request);
        await this.syncProducts(request);
        await this.syncCupons(request);
        await this.syncOrders(request);
    }

    public getStepIndex(step: Stepper): number {
        const filteredSteps: Array<Stepper> = this.steppers.filter((step: Stepper) => step.visible);
        return filteredSteps.indexOf(step) + 1;
    }

    private async syncCustomers(request: WcSyncRequest): Promise<void> {
        try {
            const result: BooleanResponse = await this.syncDataService.syncCustomers(request);
            this.setResult(result.result, `customer`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível sincronizar os clientes, tente com uma data mais recente.');
            this.setResult(false, `customer`);
        }
    }

    private async syncProducts(request: WcSyncRequest): Promise<void> {
        try {
            const result: BooleanResponse = await this.syncDataService.syncProducts(request);
            this.setResult(result.result, `product`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível sincronizar os produtos, tente com uma data mais recente.');
            this.setResult(false, `product`);
        }
    }

    private async syncCupons(request: WcSyncRequest): Promise<void> {
        try {
            const result: BooleanResponse = await this.syncDataService.syncCoupons(request);
            this.setResult(result.result, `coupon`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível sincronizar os clientes, tente com uma data mais recente.');
            this.setResult(false, `coupon`);
        }
    }

    private async syncOrders(request: WcSyncRequest): Promise<void> {
        try {
            const result: BooleanResponse = await this.syncDataService.syncOrders(request);
            this.setResult(result.result, `order`);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível sincronizar os pedidos, tente com uma data mais recente.');
            this.setResult(false, `order`);
        }
    }

    private setResult(result: boolean, entity: SyncEntity) {
        this.steppers.forEach((stepper: Stepper) => {
            if (stepper.id === entity) {
                stepper.state = result ? 'success' : 'error';
            }
        });
    }

    private setBreadcrumbItems(): void {
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
                name: `Sincronização`,
                route: `/dashboard/configurations/sync-data`
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
