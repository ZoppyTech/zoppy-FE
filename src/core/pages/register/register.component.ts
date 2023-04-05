import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { AppConstants, DateUtil, PasswordValidator, StringUtil, WhatsappUtil } from '@ZoppyTech/utilities';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { CompanyProvider } from 'src/shared/models/requests/company/company.request';
import { CompanyPlan, RegisterRequest } from 'src/shared/models/requests/public/register.request';
import { ZipcodeResponse } from 'src/shared/models/responses/zipcode/zipcode.response';
import { PublicService } from 'src/shared/services/public/public.service';
import { Navigation } from 'src/shared/utils/navigation';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    public fields: Field[] = [];
    public aboutYouFields: Field[] = [];
    public registerDataFields: Field[] = [];
    public ecommerces: Ecommerce[] = [];
    public paymentFields: Field[] = [];
    public plans: Plan[] = [];
    public loading: boolean = false;
    public step: number = -1;
    public steps: string[] = ['Sobre você', 'Planos', 'Dados cadastrais', 'Pagamento'];
    public provider: string = '';
    public roles: Item[] = [
        { value: 'founder', label: 'Fundador(a)' },
        { value: 'director', label: 'Diretor(a)' },
        { value: 'manager', label: 'Gerente' },
        { value: 'founder', label: 'Analista' },
        { value: 'seller', label: 'Vendedor(a)' }
    ];
    public segments: Item[] = [
        { value: 'food', label: 'Alimentos' },
        { value: 'automotive', label: 'Automotivos' },
        { value: 'beverage', label: 'Bebidas' },
        { value: 'camping', label: 'Camping' },
        { value: 'house_decoration', label: 'Casa e decoração' },
        { value: 'cosmetics', label: 'Cosméticos' },
        { value: 'electronics', label: 'Eletrodomésticos' },
        { value: 'manage_relationships', label: 'Eletroeletrônicos' },
        { value: 'sport', label: 'Esportes' },
        { value: 'geek', label: 'Geek' },
        { value: 'child', label: 'Infantil' },
        { value: 'computing', label: 'Informática' },
        { value: 'jewelry', label: 'Jóias' },
        { value: 'hardware_store', label: 'Material de Construção' },
        { value: 'fashion', label: 'Moda' },
        { value: 'optical', label: 'Óptica' },
        { value: 'paper', label: 'Papelaria' },
        { value: 'perfume', label: 'Perfumaria' },
        { value: 'petshop', label: 'Petshop' },
        { value: 'natural_products', label: 'Produtos Naturais' },
        { value: 'shoes', label: 'Sapatos' },
        { value: 'customer_fidelity', label: 'Saúde e Beleza' },
        { value: 'sexshop', label: 'Sexshop' },
        { value: 'others', label: 'Outros' }
    ];
    public goals: Item[] = [
        { icon: 'icon-add_shopping_cart', value: 'consume_patterns', label: 'Entender mais sobre os padrões de consumo dos meus clientes' },
        { icon: 'icon-follow', value: 'follow_up_sellers', label: 'Acompanhar melhor os meus vendedores' },
        { icon: 'icon-giftback', value: 'giftback', label: 'Programa de Giftback' },
        { icon: 'icon-handshake', value: 'manage_brand_relationships', label: 'Gerencia melhor os relacionamento da marca.' },
        { icon: 'icon-mix_products', value: 'improve_products_mix', label: 'Melhorar meu mix de produtos.' },
        { icon: 'icon-time_count', value: 'reduce_repurchase_span', label: 'Diminuir tempo de recompra dos meus clientes.' }
    ];
    public channels: Item[] = [
        { value: 'outbound', label: 'Anúncios' },
        { value: 'inbound', label: 'Comercial entrou em contato' },
        { value: 'events', label: 'Eventos' },
        { value: 'indications', label: 'Indicações' },
        { value: 'social_media', label: 'Mídias sociais' }
    ];

    public constructor(
        private readonly publicService: PublicService,
        private readonly toast: ToastService,
        private readonly router: Router,
        private readonly route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.initFields();
        this.initForm();
        this.initEcommerce();
        this.initPlans();
        this.initPaymentFields();
        this.route.paramMap.subscribe((paramMap: any) => {
            this.provider = paramMap.get('provider');
        });
    }

    public disableRegisterData(): boolean {
        if (this.getRegisterDataFieldById('revenueRecord').model.toString().length !== 11) return true;
        if (this.getRegisterDataFieldById('postcode').model.toString().length !== 8) return true;
        if (!this.getRegisterDataFieldById('street').model) return true;
        if (!this.getRegisterDataFieldById('number').model) return true;
        if (!this.getRegisterDataFieldById('complement').model) return true;
        if (!this.getRegisterDataFieldById('neighbor').model) return true;
        return false;
    }

    public disablePaymentForm(): boolean {
        if (!this.getPaymentById('name').model.toString()) return true;
        if (!StringUtil.calculateCreditCardFlag(this.getPaymentById('number').model.toString())) return true;
        if (!DateUtil.validateCardExpiryDate(this.getPaymentById('expirationDate').model.toString())) return true;
        if (!this.getPaymentById('cvv').model.toString()) return true;
        if (!this.calculateFlag(this.getPaymentById('number').model.toString())) return true;
        return false;
    }

    public getThirdStepDisabled(): boolean {
        return !this.getPlanSelected()?.value;
    }

    public secondStepDisabled(): boolean {
        let countErrors: number = 0;

        if (!WhatsappUtil.fullPhoneValidation(this.getById('phone').model.toString())) countErrors++;
        if (!this.getById('name').model) countErrors++;
        if (!StringUtil.validateEmail(this.getById('email').model.toString())) countErrors++;
        if (!PasswordValidator.validate(this.getById('password').model.toString())) countErrors++;
        if (this.getById('confirmPassword').model !== this.getById('password').model) countErrors++;

        return countErrors > 0;
    }

    public async register(): Promise<void> {
        const formValid: Validate = this.validateForm();
        const paymentFormValid: Validate = this.validatePaymentForm();
        const thirdStepValid: Validate = this.validateRegisterDataForm();

        if (!formValid.isValid) {
            this.step = -1;
            this.toast.error('Houveram erros de validação', 'Erro');
            return;
        }
        if (!thirdStepValid.isValid) {
            this.step = 2;
            this.toast.error('Houveram erros de validação', 'Erro');
            return;
        }
        if (!paymentFormValid.isValid) {
            this.toast.error('Houveram erros de validação dos valores de pagamento', 'Erro');
            this.step = 3;
            return;
        }

        try {
            this.loading = true;
            const expirationDate: string = this.getPaymentById('expirationDate').model.toString() ?? '';

            const request: RegisterRequest = {
                name: this.getById('name').model.toString(),
                phone: this.getById('phone').model.toString(),
                email: this.getById('email').model.toString(),
                companyName: this.getById('company').model.toString(),
                revenueRecord: this.getRegisterDataFieldById('revenueRecord').model.toString(),
                segment: this.getAboutYouFieldById('segment').model.toString(),
                companyRole: this.getAboutYouFieldById('role').model.toString(),
                goal: this.getAboutYouFieldById('goal').model.toString(),
                channel: this.getById('channel').model.toString(),
                password: this.getById('password').model.toString(),
                plan: this.getPlanSelected()?.value?.toString() as CompanyPlan,
                provider: this.provider as CompanyProvider,
                payment: {
                    name: this.getPaymentById('name').model.toString(),
                    expirationDate: `${expirationDate.substring(0, 2)}/${expirationDate.substring(2, 4)}`,
                    cardNumber: this.getPaymentById('number').model.toString(),
                    cvv: this.getPaymentById('cvv').model.toString(),
                    flag: this.calculateFlag(this.getPaymentById('number').model.toString())
                },
                address: {
                    street: this.getRegisterDataFieldById('street').model.toString(),
                    number: this.getRegisterDataFieldById('number').model.toString(),
                    neighbor: this.getRegisterDataFieldById('neighbor').model.toString(),
                    complement: this.getRegisterDataFieldById('complement').model.toString(),
                    postcode: this.getRegisterDataFieldById('postcode').model.toString()
                }
            };
            const thisUser: UserEntity = await this.publicService.register(request);
            this.toast.success('Seu usuário foi registrado com sucesso!', 'Tudo certo!');
            this.goBack(thisUser.email);
        } catch (ex: any) {
            this.fields.forEach((field: Field) => {
                field.errors = ['error'];
            });
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.loading = false;
        }
    }

    public async changeStep(index: number): Promise<void> {
        if (index < this.step) {
            this.step = index;
            return;
        }

        const planSelected: Plan = this.getPlanSelected();
        if (this.provider === AppConstants.PROVIDERS.TRAY && planSelected?.value === AppConstants.PLANS.FREE) {
            this.steps = ['Sobre você', 'Planos', 'Dados cadastrais'];
            if (index === 3) {
                await this.register();
                return;
            }
        }

        this.step = index;
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

    public getPlanSelected(): Plan {
        const selected: Plan = this.plans.find((plan: Plan) => plan.selected) as Plan;
        return selected;
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

        if (!this.getById('name').model) {
            this.getById('name').errors = ['error'];
            countErrors++;
        }

        if (WhatsappUtil.fullPhoneValidation(this.getById('phone').model.toString())) {
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

    private validateRegisterDataForm(): Validate {
        let countErrors: number = 0;
        let message: string = 'Houveram erros de validação';
        let title: string = 'Erro';

        if (this.getRegisterDataFieldById('revenueRecord').model.toString().length !== 11) {
            this.getRegisterDataFieldById('revenueRecord').errors = ['error'];
            countErrors++;
        }

        if (this.getRegisterDataFieldById('postcode').model.toString().length !== 8) {
            this.getRegisterDataFieldById('postcode').errors = ['error'];
            countErrors++;
        }

        if (!this.getRegisterDataFieldById('street').model) {
            this.getRegisterDataFieldById('street').errors = ['error'];
            countErrors++;
        }

        if (!this.getRegisterDataFieldById('number').model) {
            this.getRegisterDataFieldById('number').errors = ['error'];
            countErrors++;
        }

        if (!this.getRegisterDataFieldById('neighbor').model) {
            this.getRegisterDataFieldById('neighbor').errors = ['error'];
            countErrors++;
        }

        if (!this.getRegisterDataFieldById('complement').model) {
            this.getRegisterDataFieldById('complement').errors = ['error'];
            countErrors++;
        }

        return {
            isValid: countErrors === 0,
            message: message,
            title: title
        };
    }

    private validatePaymentForm(): Validate {
        if (this.provider === AppConstants.PROVIDERS.TRAY && this.getPlanSelected()?.value === AppConstants.PLANS.FREE)
            return {
                isValid: true,
                message: '',
                title: ''
            };

        let countErrors: number = 0;
        let message: string = 'Houveram erros de validação';
        let title: string = 'Erro';

        if (!this.getPaymentById('name').model) {
            this.getById('name').errors = ['error'];
            countErrors++;
        }
        const expirationDate: string = this.getPaymentById('expirationDate').model.toString() ?? '';

        if (!this.getPaymentById('name').model.toString()) {
            this.getPaymentById('name').errors = ['error'];
            countErrors++;
        }
        if (!this.getPaymentById('number').model.toString()) {
            this.getPaymentById('number').errors = ['error'];
            countErrors++;
        }
        if (`${expirationDate.substring(0, 2)}/${expirationDate.substring(2, 4)}`.length !== 5) {
            this.getPaymentById('expirationDate').errors = ['error'];
            countErrors++;
        }
        if (!this.getPaymentById('cvv').model.toString()) {
            this.getPaymentById('cvv').errors = ['error'];
            countErrors++;
        }
        if (!this.calculateFlag(this.getPaymentById('number').model.toString())) {
            countErrors++;
        }

        return {
            isValid: countErrors === 0,
            message: message,
            title: title
        };
    }

    private getById(id: string): Field {
        return this.fields.find((field: Field) => field.id === id) as Field;
    }

    private getAboutYouFieldById(id: string): Field {
        return this.aboutYouFields.find((field: Field) => field.id === id) as Field;
    }

    private getRegisterDataFieldById(id: string): Field {
        return this.registerDataFields.find((field: Field) => field.id === id) as Field;
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
                title: 'Nome*',
                placeholder: 'Digite seu nome completo',
                type: 'text',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'email',
                title: 'E-mail*',
                placeholder: 'Digite seu e-mail',
                type: 'email',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'phone',
                title: 'Telefone*',
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
                id: 'company',
                title: 'Empresa*',
                placeholder: 'Digite o nome da sua empresa',
                type: 'text',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'channel',
                title: 'Por onde conheceu a Zoppy?',
                placeholder: '',
                type: '',
                displayTop: true,
                hasImage: false,
                class: 'wide',
                inputType: 'dropdown',
                options: this.channels,
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'password',
                title: 'Senha*',
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
                title: 'Confirmar senha*',
                placeholder: 'Digite novamente sua senha',
                icon: 'icon-visibility_off',
                type: 'password',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            }
        ];
        this.aboutYouFields = [
            {
                errors: [],
                model: '',
                id: 'segment',
                title: 'Qual é o segmento da sua empresa?',
                placeholder: '',
                type: '',
                class: 'wide',
                inputType: 'dropdown',
                options: this.segments,
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'role',
                title: 'Qual é o seu cargo na empresa?',
                placeholder: '',
                type: '',
                class: 'wide',
                inputType: 'dropdown',
                options: this.roles,
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'goal',
                title: 'Qual o seu objetivo com a Zoppy?',
                placeholder: '',
                type: '',
                displayTop: true,
                class: 'wide',
                inputType: 'selector',
                options: this.goals,
                propertyLabel: 'label',
                propertyValue: 'value',
                icon: 'icon',
                onChange: () => {}
            }
        ];
        this.registerDataFields = [
            {
                errors: [],
                model: '',
                id: 'revenueRecord',
                title: 'CPF*',
                placeholder: 'Digite seu CPF',
                type: 'text',
                mask: '000.000.000-00',
                class: 'wide',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'postcode',
                title: 'CEP*',
                placeholder: 'Digite seu CEP',
                type: 'text',
                mask: '00.000-000',
                class: 'wide',
                inputType: 'input',
                onChange: async (zipCode: string) => {
                    try {
                        if (!zipCode || zipCode.length !== 8) return;
                        const zipcodeResponse: ZipcodeResponse = await this.publicService.fetchZipcode(zipCode);
                        if (zipcodeResponse && zipcodeResponse.cep) {
                            this.getRegisterDataFieldById('street').model = zipcodeResponse.logradouro;
                            this.getRegisterDataFieldById('neighbor').model = zipcodeResponse.bairro;
                        }
                    } catch (ex: any) {}
                }
            },
            {
                errors: [],
                model: '',
                id: 'street',
                title: 'Rua*',
                placeholder: 'Digite seu logradouro',
                type: 'text',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'number',
                title: 'Número*',
                placeholder: 'Digite o número',
                type: 'text',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'neighbor',
                title: 'Bairro*',
                placeholder: 'Digite o bairro',
                type: 'text',
                class: 'half-size',
                inputType: 'input',
                onChange: () => {}
            },
            {
                errors: [],
                model: '',
                id: 'complement',
                title: 'Complemento*',
                placeholder: 'Digite o complemento',
                type: 'text',
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
                title: 'Titular do cartão*',
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
                    const flag: string = this.calculateFlag(number ?? '');
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
                title: 'Data de validade*',
                placeholder: 'MM/AA',
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
                title: 'CVV (código de segurança)*',
                placeholder: 'XXX',
                type: 'number',
                class: 'half-size',
                inputType: 'input',
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
                image: '',
                selected: false,
                value: AppConstants.PROVIDERS.ONE_CHAT
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

    private calculateFlag(number: string) {
        if (number[0] === '4') return 'visa';
        else if (['34', '37'].includes(number.substring(0, 2))) return 'american_express';
        else if (['51', '52', '53', '54', '55'].includes(number.substring(0, 2))) return 'mastercard';
        return '';
    }

    private initPlans(): void {
        this.plans = [
            {
                title: 'Freemium',
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
                visible: this.provider === AppConstants.PROVIDERS.TRAY,
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.FREE,
                selected: false,
                description: 'Limite de 50 vendas mensais.'
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
                    }
                ],
                visible: true,
                satisfaction: true,
                special: false,
                value: AppConstants.PLANS.STANDARD,
                selected: false,
                description: '90 dias de garantia'
            }
        ];
    }
}

class Field {
    public errors: string[] = [];
    public model: string | number | boolean = '';
    public icon?: string = '';
    public img?: string = '';
    public placeholder: string = '';
    public title: string = '';
    public type: string = '';
    public mask?: string = '';
    public class?: string = '';
    public id: string = '';
    public inputType: string = '';
    public options?: Array<any> = [];
    public onChange: any;
    public description?: string = '';
    public displayTop?: boolean = false;
    public hasImage?: boolean = false;
    public propertyImage?: string = '';
    public propertyLabel?: string = '';
    public propertyValue?: string = '';
}

class Ecommerce {
    public image: string = '';
    public selected: boolean = false;
    public value: string = '';
}

class Item {
    public label: string = '';
    public value: string = '';
    public img?: string = '';
    public icon?: string = '';
    public class?: string = '';
}

class Plan {
    public title: string = '';
    public price: number = 0;
    public priceAction: number = 0;
    public action: string = '';
    public items: Item[] = [];
    public satisfaction: boolean = false;
    public visible: any;
    public special: boolean = false;
    public tooltip?: string = '';
    public value: string = '';
    public selected: boolean = false;
    public description: string = '';
}

interface Validate {
    isValid: boolean;
    message: string;
    title: string;
}
