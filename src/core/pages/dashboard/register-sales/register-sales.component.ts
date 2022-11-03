import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { environment } from 'src/environments/environment';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { WcAddressEntity } from 'src/shared/models/entities/wc-address.entity';
import { WcCustomerEntity } from 'src/shared/models/entities/wc-customer.entity';
import { CrmAddressRequest } from 'src/shared/models/requests/crm/crm-address.request';
import { ZipcodeResponse } from 'src/shared/models/responses/zipcode/zipcode.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { CrmAddressService } from 'src/shared/services/crm-address/crm-address.service';
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
    public state: State = 1;
    public customer: CrmAddressRequest = {};
    public loadingAddress: boolean = false;
    public logo: string = `${environment.publicBucket}/imgs/loading.svg`;
    public genders: Gender[] = [
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

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly crmAddressService: CrmAddressService,
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

    public ngOnInit() {
        this.sideMenuService.change('register-sale');
        this.setBreadcrumb();
    }

    public changeState(state: State): void {
        this.state = state;
    }

    public async fetchCustomer(phone: string) {
        if (phone.length !== 11) {
            this.customer.phone = '';
            this.toast.error('Telefone no formato incorreto', 'Corrija o formato do telefone');
            return;
        }

        try {
            this.loadingAddress = true;
            const address: CrmAddressRequest = await this.crmAddressService.findByPhone(phone);
            if (address) {
                this.customer = address;
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
            this.customer.postcode = '';
            this.toast.error('Cep no formato incorreto', 'Corrija o formato do CEP');
            return;
        }

        try {
            this.loadingAddress = true;
            const zipcodeResponse: ZipcodeResponse = await this.publicService.fetchZipcode(zipcode);
            if (zipcodeResponse) {
                this.customer.address1 = `${zipcodeResponse.logradouro}, ${zipcodeResponse.complemento}`;
                this.customer.address2 = zipcodeResponse.bairro;
                this.customer.city = zipcodeResponse.localidade;
                this.customer.state = zipcodeResponse.uf;
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
}

type State = 1 | 2;

interface Gender {
    label: string;
    value: string | null;
}
