import { ToastService } from '@ZoppyTech/toast';
import { AppConstants } from '@ZoppyTech/utilities';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { CompanyEntity } from 'src/shared/models/entities/company.entity';
import { WcKeyEntity } from 'src/shared/models/entities/wc-key.entity';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../../dashboard.base.page';
import { ZoppyException } from 'src/shared/services/api.service';
import { wcKeyRequest } from 'src/shared/models/requests/wc-key/wc-key.request';
import { WcKeyService } from 'src/shared/services/wc-key/wc-key.service';
import { BroadcastService } from 'src/shared/services/broadcast/broadcast.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-key',
    templateUrl: './key.component.html',
    styleUrls: ['./key.component.scss']
})
export class KeyComponent extends DashboardBasePage implements OnInit {
    @Input() public provider: string = '';
    @Input() public key: WcKeyEntity = new WcKeyEntity();
    @Input() public open: boolean = false;
    @Output() public openChange: EventEmitter<boolean> = new EventEmitter();
    public form: KeyForm = new KeyForm();
    public hoverMenu: boolean = false;
    public loading: boolean = false;
    public configWebhooks: boolean = true;
    public sync: boolean = true;
    public support: string = environment.support;

    public constructor(
        public override readonly storage: Storage,
        private readonly toast: ToastService,
        private readonly modal: ModalService,
        private readonly keyService: WcKeyService
    ) {
        super(storage);
    }

    public ngOnInit(): void {
        if (!this.key) this.key = new WcKeyEntity();
        this.initForm();
        this.initProvider();
        this.setForm();
    }

    public close(force: boolean = false): void {
        if (this.hoverMenu && !force) return;
        this.open = false;
        this.openChange.emit(this.open);
    }

    public copyToClipboard(field: Field): void {
        navigator.clipboard.writeText(field.model as string);
        this.toast.success('Texto copiado para a área de transferência', `Copiado!`);
    }

    public async save(): Promise<void> {
        this.loading = true;
        try {
            const request: wcKeyRequest = {
                key: this.getFieldById('key')?.model as string,
                secret: this.getFieldById('secret')?.model as string,
                url: this.getFieldById('url')?.model as string,
                admin: this.getFieldById('admin')?.model as string,
                provider: this.provider,
                syncWebhooks: this.configWebhooks,
                syncData: this.sync
            };

            if (this.key?.id) request.id = this.key.id;

            this.key?.id ? await this.keyService.update(request) : await this.keyService.create(request);
            if (this.company) this.company.provider = this.provider;
            this.storage.setCompany(this.company as CompanyEntity);
            setTimeout(() => {
                this.modal.open(Modal.IDENTIFIER.INFO, {
                    title: 'Sucesso!',
                    button: 'Entendi',
                    description: `<b>Sua integração foi concluída com sucesso!</b> Caso tenha pedido a sincronização dos dados, você receberá um email confirmando a conclusão de cada sincronização solicitada. Pedimos um prazo máximo de 24 horas para concluir sua sincronização de dados.`
                });
            });
            BroadcastService.emit('reload-providers');
            this.close(true);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Houve algum problema com a integração, favor entre em contato com o suporte');
        } finally {
            this.loading = false;
        }
    }

    private initProvider(): void {
        const company: CompanyEntity = this.storage.getCompany() as CompanyEntity;
        if (company?.provider && company.provider !== this.provider) this.key = new WcKeyEntity();
    }

    private setForm(): void {
        switch (this.provider) {
            case AppConstants.PROVIDERS.TRAY:
                return this.setTrayForm();
            case AppConstants.PROVIDERS.WOO_COMMERCE:
                return this.setWooCommerceForm();
            case AppConstants.PROVIDERS.SHOPIFY:
                return this.setShopifyForm();
            case AppConstants.PROVIDERS.YAMPI:
                return this.setYampiForm();
            case AppConstants.PROVIDERS.SHOPIFY:
                return this.setShopifyForm();
            case AppConstants.PROVIDERS.SHOPIFY:
                return this.setShopifyForm();
        }
    }

    private getFieldById(id: formId): Field | undefined {
        return this.form.fields.find((field: Field) => field.id === id);
    }

    private setYampiForm(): void {
        this.form = {
            title: 'Yampi',
            label: 'Cadastre suas chaves',
            description: 'Entre na área administrativa da sua loja para concluir a configuração',
            hasWebhook: true,
            steps: [
                'Faça login em <a href="https://app.yampi.com.br/" target="_blank">Yampi</a>',
                'Clique no menu no campo superior direito',
                'Vá em Credenciais de API e insira os valores baixo'
            ],
            fields: [
                {
                    title: 'Alias',
                    inputType: 'input',
                    placeholder: 'Digite seu alias',
                    errors: [],
                    model: this.key.admin,
                    type: 'text',
                    class: 'wide',
                    hasCopy: true,
                    id: 'admin',
                    onChange: () => {}
                },
                {
                    title: 'Secret',
                    inputType: 'input',
                    placeholder: 'Digite sua chave secreta',
                    errors: [],
                    model: this.key.secret,
                    type: 'password',
                    icon: 'icon-visibility_off',
                    class: 'wide',
                    hasCopy: true,
                    id: 'secret',
                    onIconClick: (field: Field) => {
                        field.type = field.type === 'password' ? 'text' : 'password';
                        field.icon = field.type === 'password' ? 'icon-visibility_off' : 'icon-visibility';
                    },
                    onChange: () => {}
                },
                {
                    title: 'Key',
                    inputType: 'input',
                    placeholder: 'Digite seu token',
                    errors: [],
                    model: this.key.key,
                    type: 'password',
                    icon: 'icon-visibility_off',
                    class: 'wide',
                    hasCopy: true,
                    id: 'key',
                    onIconClick: (field: Field) => {
                        field.type = field.type === 'password' ? 'text' : 'password';
                        field.icon = field.type === 'password' ? 'icon-visibility_off' : 'icon-visibility';
                    },
                    onChange: () => {}
                }
            ]
        };
    }

    private setTrayForm(): void {
        this.form = {
            title: 'Tray',
            label: 'Cadastre suas chaves',
            description: 'Entre na área administrativa da sua loja Tray de aplicativos da Tray para concluir a configuração!',
            hasWebhook: false,
            steps: ['Vá em aplicativos', 'Busque pelo App Zoppy', 'Instale-o', 'Insira o code e a URL disponibilizados nos campos abaixo'],
            fields: [
                {
                    title: 'Code',
                    inputType: 'input',
                    placeholder: 'Digite o campo code',
                    errors: [],
                    model: this.key.admin,
                    type: 'password',
                    icon: 'icon-visibility_off',
                    class: 'wide',
                    hasCopy: true,
                    id: 'admin',
                    onIconClick: (field: Field) => {
                        field.type = field.type === 'password' ? 'text' : 'password';
                        field.icon = field.type === 'password' ? 'icon-visibility_off' : 'icon-visibility';
                    },
                    onChange: () => {}
                },
                {
                    title: 'URL',
                    inputType: 'input',
                    placeholder: 'Digite a url da sua loja',
                    errors: [],
                    model: this.key.url,
                    type: 'text',
                    class: 'wide',
                    hasCopy: true,
                    id: 'url',
                    onChange: () => {}
                }
            ]
        };
    }

    private setShopifyForm(): void {
        this.form = {
            title: 'Shopify',
            label: 'Cadastre suas chaves',
            description:
                'Entre na área administrativa da sua loja, vá em Apps -> Configurações do App e dos canais de venda -> Desenvolver Apps -> Criar um app',
            steps: [
                'Insira Zoppy como nome do App, clique em Criar App',
                'Clique em: Configurar escopos da API Admin',
                `Insira as permissões:
<p class="margin-left-3 text--bold" >- read_customers</p>
<p class="margin-left-3 text--bold" >- write_discounts (read_discounts será marcado automaticamente)</p>
<p class="margin-left-3 text--bold" >- read_orders</p>
<p class="margin-left-3 text--bold" >- read_products</p>
<p class="margin-left-3 text--bold" >- write_price_rules (read_discounts será marcado automaticamente)</p>`,
                'Clique em salvar',
                'Clique em instalar App no canto superior direito da tela',
                'Revele e Copie o Token de acesso da API Admin e insira-o abaixo',
                'Insira a URL da sua loja no campo URL abaixo, essa url deve necessariamente ter o conteúdo <b class="text--primary">.myshopify.com</b>',
                'Para encontrar essa URL, clique no dropdown de lojas na tela admin, no canto superior esquerdo e escolha qual loja usar.',
                'Clique em salvar na Zoppy'
            ],
            hasWebhook: true,
            fields: [
                {
                    title: 'Admin Token',
                    inputType: 'input',
                    placeholder: 'Digite seu Admin Token',
                    errors: [],
                    model: this.key.admin,
                    type: 'password',
                    icon: 'icon-visibility_off',
                    class: 'wide',
                    hasCopy: true,
                    id: 'admin',
                    onIconClick: (field: Field) => {
                        field.type = field.type === 'password' ? 'text' : 'password';
                        field.icon = field.type === 'password' ? 'icon-visibility_off' : 'icon-visibility';
                    },
                    onChange: () => {}
                },
                {
                    title: 'URL',
                    inputType: 'input',
                    placeholder: 'Digite a url base da sua loja',
                    errors: [],
                    model: this.key.url,
                    type: 'text',
                    class: 'wide',
                    hasCopy: true,
                    id: 'url',
                    onChange: () => {}
                }
            ]
        };
    }

    private setWooCommerceForm(): void {
        this.form = {
            title: 'WooCommerce',
            label: 'Cadastre suas chaves',
            description: 'Entre na área administrativa da sua loja e siga o tutorial disponibilizado no link abaixo:',
            link: 'https://zoppy.sak.com.br/faq/como-encontrar-as-credenciais-do-woocommerce',
            hasWebhook: true,
            steps: [],
            fields: [
                {
                    title: 'Key',
                    inputType: 'input',
                    placeholder: 'Digite sua Consumer key',
                    errors: [],
                    model: this.key.key,
                    type: 'password',
                    icon: 'icon-visibility_off',
                    class: 'wide',
                    hasCopy: true,
                    id: 'key',
                    onIconClick: (field: Field) => {
                        field.type = field.type === 'password' ? 'text' : 'password';
                        field.icon = field.type === 'password' ? 'icon-visibility_off' : 'icon-visibility';
                    },
                    onChange: () => {}
                },
                {
                    title: 'Secret',
                    inputType: 'input',
                    placeholder: 'Digite sua Consumer secret',
                    errors: [],
                    model: this.key.secret,
                    type: 'password',
                    icon: 'icon-visibility_off',
                    class: 'wide',
                    hasCopy: true,
                    id: 'secret',
                    onIconClick: (field: Field) => {
                        field.type = field.type === 'password' ? 'text' : 'password';
                        field.icon = field.type === 'password' ? 'icon-visibility_off' : 'icon-visibility';
                    },
                    onChange: () => {}
                },
                {
                    title: 'URL',
                    inputType: 'input',
                    placeholder: 'Digite a url base da sua loja',
                    errors: [],
                    model: this.key.url,
                    type: 'text',
                    class: 'wide',
                    hasCopy: true,
                    id: 'url',
                    onChange: () => {}
                }
            ]
        };
    }

    private initForm(): void {
        const form: any = document.getElementById('registerForm');
        form.addEventListener('submit', (event: any) => {
            event.preventDefault();
        });
    }
}

class KeyForm {
    public declare title: string;
    public declare label: string;
    public declare description: string;
    public declare steps: string[];
    public declare link?: string;
    public declare hasWebhook: boolean;
    public declare fields: Field[];
}

type formId = 'admin' | 'secret' | 'key' | 'url';

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
    public id?: formId;
    public inputType: string = '';
    public options?: Array<any> = [];
    public onChange: any;
    public onIconClick?: any;
    public description?: string = '';
    public displayTop?: boolean = false;
    public hasImage?: boolean = false;
    public hasCopy?: boolean = false;
    public hidden?: boolean = false;
    public propertyImage?: string = '';
    public propertyLabel?: string = '';
    public propertyValue?: string = '';
}
