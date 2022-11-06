import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountPhoneNumberEntity } from 'src/shared/models/entities/whatsapp-account-phone-number.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'whatsapp-config',
    templateUrl: './whatsapp-config.component.html',
    styleUrls: ['./whatsapp-config.component.scss']
})
export class WhatsappConfigComponent implements OnInit {
    public loading: boolean = false;
    public user: UserEntity = new UserEntity();

    // public signWhatsappAccountRequest: WhatsappAccountEntity;
    // public createWhatsappAccountRequest: WhatsappAccountEntity;
    // public updateWhatsappAccountRequest: WhatsappAccountEntity;

    public declare whatsappAccount: WhatsappAccountEntity;
    public declare whatsappAccountPhone: WhatsappAccountPhoneNumberEntity;

    public webhookUrl: string = '';

    public view: any = 1;
    public items: Array<Item> = [
        {
            label: 'Todos',
            value: 1
        },
        {
            label: 'Somente enviar mensagens',
            value: 2
        },
        {
            label: 'Somente ler mensagens',
            value: 3
        }
    ];

    public constructor(
        private readonly sideMenuService: SideMenuService,
        private readonly breadcrumb: BreadcrumbService,
        private readonly modal: ModalService,
        private readonly toast: ToastService,
        private readonly storage: Storage
    ) {}

    public ngOnInit(): void {
        this.whatsappAccount = new WhatsappAccountEntity();
        this.whatsappAccountPhone = new WhatsappAccountPhoneNumberEntity();
        this.setBreadcrumbItems();
        this.sideMenuService.changeSub('whatsapp');
        this.sideMenuService.change('configurations');
        this.setLoggedUser();
    }

    public async save(): Promise<void> {}

    public copyToClipboard(): void {
        navigator.clipboard.writeText(this.webhookUrl as string);
        this.toast.success('Url do webhook copiado para a área de transferência', `Copiado!`);
    }

    private setLoggedUser(): void {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
    }

    private setBreadcrumbItems(): void {
        this.breadcrumb.items = [
            {
                name: 'Início',
                route: undefined
            },
            {
                name: 'Configurações',
                route: undefined
            },
            {
                name: 'Whatsapp',
                route: '/dashboard/configurations/whatsapp'
            }
        ];
    }
}

type View = 1 | 2 | 3;
class Item {
    public declare label: string;
    public declare value: View;
}
