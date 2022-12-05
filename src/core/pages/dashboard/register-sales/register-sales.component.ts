import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { CrmAddressRequest } from 'src/shared/models/requests/crm/crm-address.request';
import { CrmCouponRequest } from 'src/shared/models/requests/crm/crm-coupon.request';
import { CrmLineItemRequest } from 'src/shared/models/requests/crm/crm-line-item.request';
import { CrmOrderRequest } from 'src/shared/models/requests/crm/crm-order.request';
import { CrmCouponResponse } from 'src/shared/models/responses/crm/crm-coupon.response';
import { CrmCustomerDetailResponse, CrmCustomerResponse } from 'src/shared/models/responses/crm/crm-customer.response';
import { CrmOrderResponse } from 'src/shared/models/responses/crm/crm-order.response';
import { CrmProductResponse } from 'src/shared/models/responses/crm/crm-product.response';
import { ZipcodeResponse } from 'src/shared/models/responses/zipcode/zipcode.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmAddressService } from 'src/shared/services/crm-address/crm-address.service';
import { CrmCouponService } from 'src/shared/services/crm-coupon/crm-coupon.service';
import { CrmCustomerService } from 'src/shared/services/crm-customer/crm-customer.service';
import { CrmOrderService } from 'src/shared/services/crm-order/crm-order.service';
import { CrmProductService } from 'src/shared/services/crm-product/crm-product.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { FormatUtils } from 'src/shared/utils/format.util';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-register-sales',
    templateUrl: './register-sales.component.html',
    styleUrls: ['./register-sales.component.scss']
})
export class RegisterSalesComponent implements OnInit {
    public loading: boolean = false;
    public phone: string = '';
    public state: State = 1;
    public order: CrmOrderRequest = {
        address: {},
        coupon: {
            type: 'fixed_cart',
            amount: 0,
            amountCurrency: ''
        },
        lineItems: [],
        total: 0
    };
    public number: string = '';
    public complement: string = '';
    public loadingAddress: boolean = false;
    public customSubtotal: number = 0;
    public defaultCouponType: CouponType = 'fixed_cart';
    public useCustomCoupon: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public disableTotal: boolean = true;
    public products: CrmProductResponse[] = [];
    public productsSelected: CrmProductResponse[] = [];
    public genders: Item[] = [
        {
            label: 'Masculino',
            value: 'M'
        },
        {
            label: 'Feminino',
            value: 'F'
        },
        {
            label: 'Nào declarado',
            value: null
        }
    ];

    public couponTypes: Item[] = [
        {
            label: 'Porcentagem',
            value: 'percent'
        },
        {
            label: 'Reais',
            value: 'fixed_cart'
        }
    ];

    public operations: Item[] = [
        {
            label: 'Showroom',
            value: 'show-room'
        },
        {
            label: 'E-commerce',
            value: 'e-commerce'
        }
    ];

    public backupCoupon: CrmCouponResponse | undefined;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly crmCouponService: CrmCouponService,
        private readonly crmAddressService: CrmAddressService,
        private readonly crmCustomerService: CrmCustomerService,
        private readonly crmProductService: CrmProductService,
        private readonly crmOrderService: CrmOrderService,
        private readonly publicService: PublicService,
        private readonly toast: ToastService
    ) {}

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Selecionar um cliente',
            button: 'Entendi',
            description: `Para realizar o lançamento de venda você deverá informar um cliente. Se o cliente já estiver cadastrado, basta fornecer o telefone com ddd que os campos serão preenchidos automaticamente. Caso contrário, você deverá preencher todos os campos e o cliente será cadastrado em nossa base.`
        });
    }

    public openEditSubtotalModal(): void {
        this.modal.open(
            Modal.IDENTIFIER.INPUT_INFO,
            {
                title: 'Alterar o subtotal',
                cancelLabel: 'Cancelar',
                confirmLabel: 'Confirmar',
                value: this.calculateSubtotal()
            },
            (value: number) => {
                this.customSubtotal = value;
                this.order.total = value;
                this.modal.close();
            }
        );
    }

    public async ngOnInit() {
        this.sideMenuService.change('registerSale');
        this.setBreadcrumb();
        await this.fetchProducts();
        const phone: string = this.route.snapshot.paramMap.get('phone') ?? '';
        if (phone) {
            await this.fetchCustomer(phone);
            this.state = 2;
            this.phone = phone;
        }
    }

    public async toggleState(): Promise<void> {
        if (this.state === 1) {
            this.state = 2;
            return;
        }
        await this.save();
    }

    public formValid(): boolean {
        return !this.order.address.phone || !this.order.address.firstName || !this.order.address.email;
    }

    public changeState(state: number): void {
        if (state === 2 && !this.formValid()) {
            this.toast.error('Erro', 'Formulário incompleto');
            return;
        }
        this.state = state as State;
    }

    public async save(): Promise<void> {
        if (this.order.coupon?.minPurchaseValue && this.order.total < this.order.coupon.minPurchaseValue) {
            this.toast.error('Valor mínimo da compra não foi atingido!', 'Erro!');
            return;
        }
        try {
            this.loading = true;
            this.formatAddress();
            const order: CrmOrderResponse = await this.crmOrderService.create(this.order);
            this.order = order as CrmOrderRequest;
            this.toast.success('Sua venda foi registrada com sucesso!', 'Sucesso!');
            this.resetOrder();
            this.state = 1;
            if (this.phone) {
                const customer: CrmCustomerDetailResponse = await this.crmCustomerService.findByPhone(this.phone);
                this.router.navigate([Navigation.routes.customerSocialMedia, customer.customerId]);
            }
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível salvar seu pedido');
        } finally {
            this.loading = false;
        }
    }

    public async fetchProducts(): Promise<void> {
        try {
            this.loadingAddress = true;
            const products: CrmProductResponse[] = await this.crmProductService.findAll();
            this.products = products;
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o telefone');
        } finally {
            this.loadingAddress = false;
        }
    }

    public async fetchCustomer(phone: string) {
        debugger;
        if (phone.length !== 11) {
            this.order.address.phone = '';
            this.toast.error('Telefone no formato incorreto', 'Corrija o formato do telefone');
            return;
        }

        try {
            this.loadingAddress = true;
            const address: CrmAddressRequest = await this.crmAddressService.findByPhone(phone);
            if (address) {
                this.order.address = address;
                this.toast.success(`Contato carregado!`, `Sucesso!`);
                const existingCoupon: CrmCouponResponse = await this.crmCouponService.findByPhone(this.order.address.phone as string);
                if (existingCoupon) {
                    this.order.coupon = existingCoupon as CrmCouponRequest;
                    this.useCustomCoupon = false;
                }
            } else {
                this.toast.alert(`Preencha as informações do cliente`, `Cliente não encontrado!`);
            }
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o telefone');
        } finally {
            this.loadingAddress = false;
        }
    }

    public async fetchZipcode(zipcode: string) {
        if (zipcode.length !== 8) {
            this.order.address.postcode = '';
            this.toast.error('Cep no formato incorreto', 'Corrija o formato do CEP');
            return;
        }

        try {
            this.loadingAddress = true;
            const zipcodeResponse: ZipcodeResponse = await this.publicService.fetchZipcode(zipcode);
            if (zipcodeResponse && zipcodeResponse.cep) {
                this.order.address.address1 = `${zipcodeResponse.logradouro}`;
                this.order.address.address2 = zipcodeResponse.bairro;
                this.order.address.city = zipcodeResponse.localidade;
                this.order.address.state = zipcodeResponse.uf;
                this.toast.success(`Contato carregado!`, `Sucesso!`);
            } else {
                this.toast.error(`Preencha as informações do CEP`, `CEP não encontrado!`);
            }
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter as informações do CEP');
        } finally {
            this.loadingAddress = false;
        }
    }

    public selectProduct(values: Array<string>) {
        setTimeout(() => {
            this.order.lineItems = [];
            values.forEach((id: string) => {
                const product: CrmProductResponse | undefined = this.products.find((product: CrmProductResponse) => product.id === id);
                if (product) {
                    product.quantity = 1;
                    this.order.lineItems?.push({
                        quantity: 1,
                        productId: product.id,
                        name: product.name,
                        wcProductId: product.wcId
                    });
                }
            });
            this.calculateTotalBasedOnProducts();
        });
    }

    public calculateTotalBasedOnProducts(): void {
        let total: number = 0;
        this.order.lineItems?.forEach((lineItem: CrmLineItemRequest) => {
            const product: CrmProductResponse | undefined = this.products.find(
                (product: CrmProductResponse) => product.id === lineItem.productId
            );
            if (product) total += product.price * lineItem.quantity;
        });
        this.order.total = total;
        this.order.totalCurrency = FormatUtils.toCurrency(total);
    }

    public toggleUseCustomCoupon(active: boolean) {
        if (!active) {
            this.order.coupon = this.backupCoupon as CrmCouponRequest;
            return;
        }
        this.backupCoupon = this.order.coupon as CrmCouponResponse;
        this.order.coupon = {
            amount: 0,
            amountCurrency: '',
            type: this.defaultCouponType,
            phone: this.order.address.phone
        };
    }

    public toCurrency(value: string | number): string {
        return FormatUtils.toCurrency(parseFloat(value as string));
    }

    public changeLineItem(lineItem: CrmLineItemRequest, signal: string): void {
        if (signal === '-') lineItem.quantity -= 1;
        if (signal === '+') lineItem.quantity += 1;
        this.calculateTotalBasedOnProducts();
    }

    public calculateTotal(): string {
        if (this.order?.coupon?.type === 'fixed_cart') {
            const value: number = this.order.total - this.order?.coupon?.amount;
            return FormatUtils.toCurrency(value);
        } else if (this.order?.coupon?.type === 'percent')
            return FormatUtils.toCurrency(this.order?.total * ((100 - this.order?.coupon?.amount) / 100));
        return FormatUtils.toCurrency(this.order?.total);
    }

    public calculateSubtotal(): string {
        return FormatUtils.toCurrency(this.order?.total);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Lançamento de venda`,
                route: undefined
            }
        ];
    }

    private resetOrder(): void {
        this.order = {
            address: {},
            coupon: {
                type: 'fixed_cart',
                amount: 0,
                amountCurrency: ''
            },
            lineItems: [],
            total: 0
        };
        this.productsSelected = [];
        this.customSubtotal = 0;
    }

    private formatAddress(): void {
        if (this.number) this.order.address.address1 += `, nº ${this.number}`;
        if (this.complement) this.order.address.address1 += `, complemento ${this.complement}`;
    }
}

type State = 1 | 2;
type CouponType = 'percent' | 'fixed_cart';
interface Item {
    label: string;
    value: string | null;
}
