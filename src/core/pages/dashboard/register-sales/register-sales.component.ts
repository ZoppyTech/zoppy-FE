import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WcAddressEntity } from 'src/shared/models/entities/wc-address.entity';
import { WcCustomerEntity } from 'src/shared/models/entities/wc-customer.entity';
import { CrmAddressRequest } from 'src/shared/models/requests/crm/crm-address.request';
import { CrmOrderRequest } from 'src/shared/models/requests/crm/crm-order.request';
import { CrmLineItemResponse } from 'src/shared/models/responses/crm/crm-line-item.response';
import { CrmProductResponse } from 'src/shared/models/responses/crm/crm-product.response';
import { ZipcodeResponse } from 'src/shared/models/responses/zipcode/zipcode.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmAddressService } from 'src/shared/services/crm-address/crm-address.service';
import { CrmProductService } from 'src/shared/services/crm-product/crm-product.service';
import { ExternalTokenService } from 'src/shared/services/external-token/external-token.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-register-sales',
    templateUrl: './register-sales.component.html',
    styleUrls: ['./register-sales.component.scss']
})
export class RegisterSalesComponent implements OnInit {
    public loading: boolean = false;
    public state: State = 2;
    public order: CrmOrderRequest = {
        address: {},
        coupon: {
            amount: 0
        },
        lineItems: [],
        total: 0
    };
    public loadingAddress: boolean = false;
    public couponType: string = '';
    public couponAmount: number = 0;
    public useExistingCoupon: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public products: CrmProductResponse[] = [];
    public productsSelected: CrmProductResponse[] = [];
    public lineItems: CrmProductResponse[] = [];
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
            value: 'value'
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

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly crmAddressService: CrmAddressService,
        private readonly crmProductService: CrmProductService,
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

    public async ngOnInit() {
        this.sideMenuService.change('register-sale');
        this.setBreadcrumb();
        await this.fetchProducts();
    }

    public changeState(state: State): void {
        this.state = state;
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
            if (zipcodeResponse) {
                this.order.address.address1 = `${zipcodeResponse.logradouro}, ${zipcodeResponse.complemento}`;
                this.order.address.address2 = zipcodeResponse.bairro;
                this.order.address.city = zipcodeResponse.localidade;
                this.order.address.state = zipcodeResponse.uf;
                this.toast.success(`Contato carregado!`, `Sucesso!`);
            } else {
                this.toast.alert(`Preencha as informações do CEP`, `CEP não encontrado!`);
            }
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o telefone');
        } finally {
            this.loadingAddress = false;
        }
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Lançamento de venda`,
                route: undefined
            }
        ];
    }

    public selectPRoduct(values: Array<string>) {
        setTimeout(() => {
            this.lineItems = [];
            values.forEach((id: string) => {
                const product: CrmProductResponse | undefined = this.products.find((product: CrmProductResponse) => product.id === id);
                if (product) {
                    product.quantity = 1;
                    this.lineItems.push(product);
                }
            });
        });
    }
}

type State = 1 | 2;
type CouponType = 'percent' | 'fixed-cart';
interface Item {
    label: string;
    value: string | null;
}
