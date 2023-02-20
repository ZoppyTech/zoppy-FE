import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants, PasswordValidator, StringUtil } from '@ZoppyTech/utilities';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { CompanyProvider, CompanyRequest } from 'src/shared/models/requests/company/company.request';
import { PaymentRequest } from 'src/shared/models/requests/company/payment.request';
import { CompanyPlan, RegisterRequest } from 'src/shared/models/requests/public/register.request';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public fields: Field[] = [];
    public ecommerces: Ecommerce[] = [];
    public paymentFields: Field[] = [];
    public plans: Plan[] = [];
    public loading: boolean = false;
    public acceptTerms: boolean = false;
    public step: number = 1;
    public paymentRequest?: PaymentRequest;

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router
    ) {}

    public ngOnInit() {
        this.initFields();
        this.initForm();
        this.initEcommerce();
        this.initPlans();
        this.initPaymentFields();
    }

    public async register(): Promise<void> {
        const formValid: Validate = this.validateForm();
        const paymentFormValid: boolean = this.validatePaymentForm();
        if (!this.acceptTerms) {
            this.toast.error('É necessário aceitar os Termos e condições', 'Erro');
            return;
        }
        if (!PasswordValidator.validate(this.getById('password').model.toString())) {
            this.toast.error(
                'Sua senha deve ter no mínimo 8 caracteres, 1 caractere especial, 1 número e uma letra maiúscula',
                'Senha não obedece padrões de segurança',
                6
            );
            return;
        }
        if (!formValid.isValid) {
            this.toast.error('Houveram erros de validação', 'Erro');
            return;
        }
        if (!paymentFormValid) {
            this.toast.error('Houveram erros de validação dos valores de pagamento', 'Erro');
            return;
        }

        try {
            this.loading = true;
            const request: RegisterRequest = {
                name: this.getById('name').model.toString(),
                phone: this.getById('phone').model.toString(),
                email: this.getById('email').model.toString(),
                companyName: this.getById('company').model.toString(),
                password: this.getById('password').model.toString(),
                plan: this.getPlanSelected()?.value?.toString() as CompanyPlan,
                provider: this.getEcommerceSelected()?.value?.toString() as CompanyProvider,
                payment: this.paymentRequest
            };
            const thisUser: UserEntity = await this.publicService.register(request);
            this.toast.success('Seu usuário foi registrado com sucesso!', 'Tudo certo!');
            this.goBack(thisUser.email);
        } catch (ex: any) {
            this.fields.forEach((field: Field) => {
                field.errors = ['error'];
            });
            this.toast.error(ex.message, 'Erro');
        } finally {
            this.loading = false;
        }
    }

    public goBack(email: string): void {
        this.router.navigate([Navigation.routes.login, email]);
    }

    public iconClicked(field: Field): void {
        field.type = field.type === 'password' ? 'text' : 'password';
        field.icon = field.type === 'password' ? 'icon-visibility' : 'icon-visibility_off';
    }

    public selectEcommerce(value: string) {
        const selected: Ecommerce = this.ecommerces.find((ecommerce: Ecommerce) => ecommerce.selected) as Ecommerce;

        if (selected?.value === value) {
            selected.selected = false;
            return;
        }
        this.ecommerces.forEach((ecommerce: Ecommerce) => {
            ecommerce.selected = ecommerce.value === value;
        });
    }

    public selectPlan(value: string): void {
        const selected: Plan = this.plans.find((plan: Plan) => plan.selected) as Plan;

        if (selected?.value === value) {
            selected.selected = false;
            return;
        }
        this.plans.forEach((plan: Plan) => {
            plan.selected = plan.value === value;
        });
    }

    public getEcommerceSelected(): Ecommerce {
        return this.ecommerces.find((ecommerce: Ecommerce) => ecommerce.selected) as Ecommerce;
    }

    public getPlanSelected(): Plan {
        return this.plans.find((plan: Plan) => plan.selected) as Plan;
    }

    public goToSecondStep(): void {
        const formValidator: Validate = this.validateForm();
        if (!this.acceptTerms) {
            this.toast.error('É necessário aceitar os Termos e condições', 'Erro');
            return;
        }
        if (!formValidator.isValid) {
            this.toast.error(formValidator.message, formValidator.title);
            return;
        }
        if (!this.getById('e-commerce').model) {
            this.step = 3;
            return;
        }
        this.step = 2;
    }

    public backToSecondStep(): void {
        if (!this.getById('e-commerce').model) {
            this.step = 1;
            return;
        }
        this.step = 2;
    }

    public backToThirdStep(): void {
        if (!this.getById('e-commerce').model) {
            this.backToSecondStep();
            return;
        }
        this.step = 3;
    }

    public getSecondStepDisabled(): boolean {
        return !this.getEcommerceSelected()?.value;
    }

    public goToThirdStep(): void {
        this.initPlans();
        this.step = 3;
    }

    public async goToPayment(): Promise<void> {
        if (this.getPlanSelected()?.value === AppConstants.PLANS.FREE) {
            await this.register();
            return;
        }
        this.step = 4;
    }

    public getThirdStepDisabled(): boolean {
        return !this.getPlanSelected()?.value;
    }

    private initForm(): void {
        const form: any = document.getElementById('registerForm');
        form.addEventListener('submit', (event: any) => {
            event.preventDefault();
        });
    }

    private validateForm(): Validate {
        let countErrors: number = 0;
        let message: string = 'Houveram erros de validação';
        let title: string = 'Erro';

        this.fields.forEach((field: Field) => {
            if (field.model === null || field.model === undefined || field.model === '') {
                field.errors = ['error'];
                countErrors++;
            }
        });

        if (this.getById('phone').model.toString().length !== 11) {
            this.getById('phone').errors = ['error'];
            countErrors++;
        }

        if (!StringUtil.validateEmail(this.getById('email').model.toString())) {
            this.getById('email').errors = ['error'];
            countErrors++;
        }

        if (!PasswordValidator.validate(this.getById('password').model.toString())) {
            this.getById('confirmPassword').errors = ['error'];
            this.getById('password').errors = ['error'];
            message = 'Sua senha deve ter no mínimo 8 caracteres, 1 caractere especial, 1 número e uma letra maiúscula';
            title = 'Senha não obedece padrões de segurança';
            countErrors++;
        }

        if (this.getById('confirmPassword').model !== this.getById('password').model) {
            this.getById('confirmPassword').errors = ['error'];
            this.getById('password').errors = ['error'];
            countErrors++;
        }

        return {
            isValid: countErrors === 0,
            message: message,
            title: title
        };
    }

    private validatePaymentForm(): boolean {
        if (!this.getPaymentById('name').model) return true;
        const expirationDate: string = this.getPaymentById('expirationDate').model.toString() ?? '';

        this.paymentRequest = new PaymentRequest();
        this.paymentRequest.name = this.getPaymentById('name').model.toString();
        this.paymentRequest.cardNumber = this.getPaymentById('number').model.toString();
        this.paymentRequest.expirationDate = `${expirationDate.substring(0, 2)}/${expirationDate.substring(2, 4)}`;
        this.paymentRequest.cvv = this.getPaymentById('cvv').model.toString();
        this.paymentRequest.flag = this.getPaymentById('flag').model.toString();

        if (
            !this.paymentRequest.name ||
            !this.paymentRequest.cardNumber ||
            !this.paymentRequest.expirationDate ||
            !this.paymentRequest.cvv ||
            !this.paymentRequest.flag ||
            this.paymentRequest.expirationDate?.length !== 5
        ) {
            return false;
        }

        return true;
    }

    private getById(id: string): Field {
        return this.fields.find((field: Field) => field.id === id) as Field;
    }

    private getPaymentById(id: string): Field {
        return this.paymentFields.find((field: Field) => field.id === id) as Field;
    }

    private initFields(): void {
        this.fields = [
            {
                errors: [],
                model: '',
                id: 'name',
                title: 'Nome',
                placeholder: 'Digite seu nome completo',
                type: 'text',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'phone',
                title: 'Telefone',
                placeholder: 'Digite seu telefone',
                type: 'text',
                mask: '(00) 00000-0000',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },

            {
                errors: [],
                model: '',
                id: 'email',
                title: 'E-mail',
                placeholder: 'Digite seu e-mail',
                type: 'email',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'company',
                title: 'Empresa',
                placeholder: 'Digite o nome da sua empresa',
                type: 'text',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: true,
                id: 'e-commerce',
                title: 'Você possui e-commerce?',
                placeholder: '',
                type: '',
                class: 'wide',
                inputType: 'radio-button',
                options: [
                    {
                        label: 'Sim',
                        value: true
                    },
                    {
                        label: 'Não',
                        value: false
                    }
                ],
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'password',
                title: 'Senha',
                icon: 'icon-visibility_off',
                placeholder: 'Digite sua senha',
                type: 'password',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'confirmPassword',
                title: 'Confirmar senha',
                placeholder: 'Digite novamente sua senha',
                icon: 'icon-visibility_off',
                type: 'password',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            }
        ];
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
                title: 'Número do cartão',
                placeholder: 'Digite o número do cartão',
                type: 'number',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
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
            },
            {
                errors: [],
                model: true,
                id: 'flag',
                title: 'Bandeira',
                placeholder: '',
                type: '',
                class: 'wide',
                inputType: 'dropdown',
                options: [
                    { img: './assets/svg/mastercard.svg', value: 'mastercard', label: 'Mastercard' },
                    { img: './assets/svg/visa.svg', value: 'visa', label: 'Visa' },
                    { img: './assets/svg/american_express.svg', value: 'american_express', label: 'American Express' }
                ],
                onChange: () => {}
            }
        ];
    }

    private initEcommerce(): void {
        this.ecommerces = [
            {
                image: './assets/svg/woo-commerce.svg',
                selected: false,
                value: AppConstants.PROVIDERS.WOO_COMMERCE
            },
            {
                image: './assets/svg/shopify.svg',
                selected: false,
                value: AppConstants.PROVIDERS.SHOPIFY
            },
            {
                image: './assets/svg/nuvemshop.svg',
                selected: false,
                value: AppConstants.PROVIDERS.NUVEMSHOP
            },
            {
                image: './assets/svg/tray.svg',
                selected: false,
                value: AppConstants.PROVIDERS.TRAY
            },
            {
                image: './assets/svg/yampi.svg',
                selected: false,
                value: AppConstants.PROVIDERS.YAMPI
            },
            {
                image: './assets/svg/dooca.svg',
                selected: false,
                value: AppConstants.PROVIDERS.DOOCA
            }
        ];
    }

    private isPartner(): boolean {
        return this.getEcommerceSelected()?.value === AppConstants.PROVIDERS.TRAY;
    }

    private initPlans(): void {
        this.plans = [
            {
                title: 'Gratuito',
                price: 0,
                priceAction: 0,
                action: 'por venda',
                items: [
                    'Limite máximo de 50 vendas por mês',
                    'Giftback disparado por email',
                    'Dashboard personalizados',
                    'NPS manual',
                    '90 dias de garantia'
                ],
                visible: this.isPartner(),
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.FREE,
                selected: false
            },
            {
                title: 'Crescimento',
                price: 297,
                priceAction: 0.15,
                action: 'por venda',
                items: ['Giftback disparado por email', 'Dashboard personalizados', 'NPS manual', '90 dias de garantia'],
                visible: true,
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.BASIC,
                selected: false
            },
            {
                title: 'Desenvolvimento',
                price: 297,
                priceAction: 0.5,
                action: 'por venda',
                items: ['Tudo do plano Crescimento', 'Giftback disparado pelo WhastApp Zoppy', 'NPS automático', '90 dias de garantia'],
                visible: true,
                satisfaction: true,
                special: true,
                value: AppConstants.PLANS.STANDARD,
                selected: false
            },
            {
                title: 'Perpetuação',
                price: 297,
                priceAction: 0.5,
                action: 'por janela aberta',
                tooltip:
                    'A janela de conversa engloba todas as mensagens trocadas em um prazo de 24 horas a partir da primeira mensagem da empresa, seja por iniciativa própria ou como uma resposta ao cliente.',
                items: [
                    'Dashboard personalizados e inteligentes',
                    'Giftback disparado pelo seu próprio Whatsapp',
                    'Gestor de contas exclusivo que vai te auxiliar a ter as melhores estratégias',
                    'Campanhas de reativação e marketing com seu próprio WhatsApp'
                ],
                visible: !this.isPartner(),
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.PREMIUM,
                selected: false
            }
        ];
    }
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
}

class Ecommerce {
    public image: string = '';
    public selected: boolean = false;
    public value: string = '';
}

class Plan {
    public title: string = '';
    public price: number = 0;
    public priceAction: number = 0;
    public action: string = '';
    public items: string[] = [];
    public satisfaction: boolean = false;
    public visible: any;
    public special: boolean = false;
    public tooltip?: string = '';
    public value: string = '';
    public selected: boolean = false;
}

interface Validate {
    isValid: boolean;
    message: string;
    title: string;
}
