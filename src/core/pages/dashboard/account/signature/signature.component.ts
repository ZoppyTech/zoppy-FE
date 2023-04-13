import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { CompanyService } from './../../../../../shared/services/company/company.service';
import { CompanyEntity } from './../../../../../shared/models/entities/company.entity';
import { PaymentMethodEntity } from './../../../../../shared/models/entities/payment-method.entity';
import { PaymentMethodService } from './../../../../../shared/services/payment-method/payment-method.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { AppConstants, DateUtil, StringUtil } from '@ZoppyTech/utilities';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ZoppyException } from 'src/shared/services/api.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { PaymentRequest } from 'src/shared/models/requests/company/payment.request';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {
    public user: UserEntity = new UserEntity();
    public company: CompanyEntity = new CompanyEntity();
    public loaded: boolean = false;
    public paymentMethodLoading: boolean = false;
    public plan: Plan = {
        name: '',
        attributes: [],
        unit: '',
        unitValue: 0,
        value: 0
    };
    public planCards: PlanCard[] = [];
    public paymentFields: Field[] = [];

    public state: number = 1;
    public paymentMethod: PaymentMethodView = new PaymentMethodView();
    public nextPaymentDate: Date = new Date();

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public confirmAction: ConfirmActionService,
        private readonly userService: UserService,
        private readonly paymentMethodService: PaymentMethodService,
        private readonly companyService: CompanyService,
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly storage: Storage,
        private readonly route: ActivatedRoute
    ) {}

    public async ngOnInit() {
        this.route.paramMap.subscribe(async (paramMap: any) => {
            this.state = paramMap.get('state') ? +paramMap.get('state') : 1;
            this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
            this.company = this.storage.getCompany() as UserEntity;
            this.setBreadcrumb();
            this.sideMenuService.change(`none`);
            this.sideMenuService.changeSubAccount(`signature`);
            this.setAttributes();
            this.initPlans();
            this.initPaymentFields();
            this.company.createdAt = new Date(this.company.createdAt?.toString() ?? '');
            this.nextPaymentDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, this.company.createdAt?.getDate());
            await this.fetchData();
            this.loaded = true;
        });
    }

    public async cancel(): Promise<void> {
        this.confirmAction.open(
            'Têm certeza que deseja cancelar sua assinatura',
            'Caso inativada, sua conta não poderá ser acessada ao menos que seja reativada',
            async (result: boolean) => {
                if (!result) return;
                try {
                    await this.companyService.inactivate();
                    this.toast.success(
                        'Sua solicitação de cancelamento foi processada e em breve nossa equipe irá entrar em contato com você',
                        'Cancelamento processado!',
                        6
                    );
                    this.publicService.logout();
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Erro!');
                }
            }
        );
    }

    public async savePaymentMethod(): Promise<void> {
        const paymentFormValid: boolean = this.validatePaymentForm();

        if (!paymentFormValid) {
            this.paymentFields.forEach((field: Field) => {
                field.errors = ['error'];
            });
            this.toast.error('Houveram erros de validação dos valores de pagamento', 'Erro');
            return;
        }

        try {
            this.paymentMethodLoading = true;
            const expirationDate: string = this.getPaymentById('expirationDate').model.toString() ?? '';
            const company: CompanyEntity = await this.companyService.updatePaymentMethod({
                name: this.getPaymentById('name').model.toString(),
                expirationDate: `${expirationDate.substring(0, 2)}/${expirationDate.substring(2, 4)}`,
                cardNumber: this.getPaymentById('number').model.toString(),
                cvv: this.getPaymentById('cvv').model.toString(),
                flag: StringUtil.calculateCreditCardFlag(this.getPaymentById('number').model.toString())
            });
            this.storage.setCompany(company);
            this.toast.success('Plano atualizado com sucesso!', 'Tudo certo!');
            this.company = company;
            this.state = company.vindiId && company.vindiPaymentProfileId && company.plan === AppConstants.PLANS.FREE ? 3 : 1;
            this.initPlans();
            this.initPaymentFields();
            await this.fetchData();
            BroadcastService.emit('reload-dashboard');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.paymentMethodLoading = false;
        }
    }

    public iconClicked(field: Field): void {
        field.type = field.type === 'password' ? 'text' : 'password';
        field.icon = field.type === 'password' ? 'icon-visibility' : 'icon-visibility_off';
    }

    public async updatePlan(plan: PlanCard): Promise<void> {
        plan.loading = true;
        try {
            const company: CompanyEntity = await this.companyService.updatePlan(plan.value);
            this.storage.setCompany(company);
            this.toast.success('Plano atualizado com sucesso!', 'Tudo certo!');
            this.state = 1;
            this.company = company;
            this.initPlans();
            BroadcastService.emit('reload-dashboard');
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            plan.loading = false;
        }
    }

    public isPartner(): boolean {
        return this.company?.provider === AppConstants.PROVIDERS.TRAY;
    }

    public changePlan(): void {
        this.state = 3;
    }

    private validatePaymentForm(): boolean {
        let valid: boolean = true;
        if (!this.getPaymentById('name').model.toString()) valid = false;
        if (!StringUtil.validateCreditCard(this.getPaymentById('number').model.toString())) valid = false;
        if (!StringUtil.calculateCreditCardFlag(this.getPaymentById('number').model.toString())) valid = false;
        if (!DateUtil.validateCardExpiryDate(this.getPaymentById('expirationDate').model.toString())) valid = false;
        if (!this.getPaymentById('cvv').model.toString()) valid = false;
        return valid;
    }

    private initPlans(): void {
        this.planCards = [
            {
                title: 'Gratuito',
                price: 0,
                priceAction: 0,
                action: 'por venda',
                items: [
                    {
                        label: 'Giftback',
                        value: '',
                        icon: 'icon-confirmation_number',
                        class: 'text'
                    },
                    {
                        label: 'Relatórios inteligentes',
                        value: '',
                        icon: 'icon-register_reports',
                        class: 'text'
                    },
                    {
                        label: 'Whatsapp Zoppy',
                        value: '',
                        icon: 'icon-wpp',
                        class: 'text'
                    },
                    {
                        label: 'Gestor de conta',
                        value: '',
                        icon: 'icon-manage_accounts',
                        class: 'text'
                    },
                    {
                        label: 'Painel do Vendedor',
                        value: '',
                        icon: 'icon-assignment_ind',
                        class: 'text'
                    },
                    {
                        label: 'Carrinho Abandonado',
                        value: '',
                        icon: 'icon-shopping_cart',
                        class: 'text'
                    },
                    {
                        label: 'NPS',
                        value: '',
                        icon: 'icon-star',
                        class: 'text'
                    }
                ],
                visible: this.isPartner(),
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.FREE,
                selected: this.company.plan === AppConstants.PLANS.FREE,
                loading: false
            },
            {
                title: 'Desenvolvimento',
                price: 297,
                priceAction: 0.5,
                action: 'por venda',
                items: [
                    {
                        label: 'Giftback',
                        value: '',
                        icon: 'icon-confirmation_number',
                        class: 'text'
                    },
                    {
                        label: 'Relatórios inteligentes',
                        value: '',
                        icon: 'icon-register_reports',
                        class: 'text'
                    },
                    {
                        label: 'Whatsapp Zoppy',
                        value: '',
                        icon: 'icon-wpp',
                        class: 'text'
                    },
                    {
                        label: 'Gestor de conta',
                        value: '',
                        icon: 'icon-manage_accounts',
                        class: 'text'
                    },
                    {
                        label: 'Painel do Vendedor',
                        value: '',
                        icon: 'icon-assignment_ind',
                        class: 'text'
                    },
                    {
                        label: 'Carrinho Abandonado',
                        value: '',
                        icon: 'icon-shopping_cart',
                        class: 'text'
                    },
                    {
                        label: 'NPS',
                        value: '',
                        icon: 'icon-star',
                        class: 'text'
                    },
                    {
                        label: 'Primeiras 150 vendas/mês gratuitas.',
                        value: '',
                        icon: 'icon-thumb_up',
                        class: 'text'
                    }
                ],
                visible: true,
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.STANDARD,
                selected: this.company.plan === AppConstants.PLANS.STANDARD,
                loading: false
            }
        ];
    }

    private setAttributes(): void {
        switch (this.company.plan) {
            case AppConstants.PLANS.BASIC:
                this.plan = {
                    name: 'Crescimento',
                    attributes: [
                        'Sem limite de vendas',
                        'Giftback disparado por email',
                        'Dashboard personalizados',
                        'NPS',
                        'Painel do vendedor'
                    ],
                    unit: 'venda',
                    unitValue: 0.15,
                    value: 297
                };
                break;
            case AppConstants.PLANS.STANDARD:
                this.plan = {
                    name: 'Desenvolvimento',
                    attributes: [
                        'Sem limite de vendas',
                        'Giftback disparado pelo whatsapp da Zoppy',
                        'Dashboard personalizados',
                        'NPS',
                        'Painel do vendedor'
                    ],
                    unit: 'venda',
                    unitValue: 0.5,
                    value: 297
                };
                break;
            default:
                this.plan = {
                    name: 'Gratuito',
                    attributes: [
                        'Limite máximo de 50 vendas por mês',
                        'Giftback disparado por email',
                        'Dashboard personalizados',
                        'NPS',
                        'Painel do vendedor'
                    ],
                    unit: 'venda',
                    unitValue: 0,
                    value: 0
                };
                break;
        }
    }

    private async fetchData(): Promise<void> {
        this.paymentMethod = (await this.paymentMethodService.find()) as PaymentMethodView;
        if (!this.paymentMethod) return;
        switch (this.paymentMethod.flag) {
            case 'visa':
                this.paymentMethod.img = './assets/svg/visa.svg';
                break;
            case 'american_express':
                this.paymentMethod.img = './assets/svg/american_express.svg';
                break;
            case 'mastercard':
                this.paymentMethod.img = './assets/svg/mastercard.svg';
                break;
        }
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Assinatura`,
                route: Navigation.routes.profile
            }
        ];
    }

    private getPaymentById(id: string): Field {
        return this.paymentFields.find((field: Field) => field.id === id) as Field;
    }

    private initPaymentFields(): void {
        this.paymentFields = [
            {
                errors: [],
                model: '',
                id: 'name',
                title: 'Titular do cartão',
                placeholder: 'Digite seu nome conforme aparece no cartão',
                type: 'text',
                class: 'wide',
                inputType: 'input',
                onChange: () => {
                    setTimeout(() => {
                        this.getPaymentById('name').model = (this.getPaymentById('name').model.toString() ?? '').replace(/[0-9]/g, '');
                    });
                }
            },
            {
                errors: [],
                model: '',
                id: 'number',
                title: 'Número do cartão*',
                placeholder: 'Digite o número do cartão',
                type: 'number',
                class: 'wide',
                icon: 'icon-visa',
                propertyImage: 'img',
                inputType: 'input',
                onChange: (number: string) => {
                    const flag: string = StringUtil.calculateCreditCardFlag(number ?? '');
                    switch (flag) {
                        case 'visa':
                            this.getPaymentById('number').img = './assets/svg/visa.svg';
                            break;
                        case 'american_express':
                            this.getPaymentById('number').img = './assets/svg/american_express.svg';
                            break;
                        case 'mastercard':
                            this.getPaymentById('number').img = './assets/svg/mastercard.svg';
                            break;
                        default:
                            this.getPaymentById('number').img = '';
                            break;
                    }
                }
            },
            {
                errors: [],
                model: '',
                id: 'expirationDate',
                title: 'Data de validade',
                placeholder: 'Digite o nome da sua empresa',
                type: 'text',
                mask: '00/00',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'cvv',
                title: 'CVV (código de segurança)',
                placeholder: 'Digite seu código de segurança',
                type: 'number',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            }
        ];
    }
}

class PaymentMethodView extends PaymentMethodEntity {
    public declare img: string;
}

interface Plan {
    name: string;
    attributes: string[];
    value: number;
    unit: string;
    unitValue: number;
}

class PlanCard {
    public title: string = '';
    public price: number = 0;
    public priceAction: number = 0;
    public action: string = '';
    public items: PlanItem[] = [];
    public satisfaction: boolean = false;
    public visible: any;
    public special: boolean = false;
    public tooltip?: string = '';
    public value: string = '';
    public selected: boolean = false;
    public loading: boolean = false;
}

class PlanItem {
    public label: string = '';
    public value: string = '';
    public img?: string = '';
    public icon?: string = '';
    public class?: string = '';
}

class Field {
    public errors: string[] = [];
    public model: string | number | boolean = '';
    public icon?: string = '';
    public placeholder: string = '';
    public title: string = '';
    public type: string = '';
    public mask?: string = '';
    public class?: string = '';
    public id: string = '';
    public inputType: string = '';
    public options?: Array<any> = [];
    public onChange: any;
    public propertyImage?: string = '';
    public img?: string = '';
}

interface Validate {
    isValid: boolean;
    message: string;
    title: string;
}
