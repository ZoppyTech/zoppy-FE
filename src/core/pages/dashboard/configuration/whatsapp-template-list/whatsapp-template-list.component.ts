import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'whatsapp-template-list',
    templateUrl: './whatsapp-template-list.component.html',
    styleUrls: ['./whatsapp-template-list.component.scss']
})
export class WhatsappTemplateListComponent implements OnInit {
    public loading: boolean = false;
    public user: UserEntity = new UserEntity();
    public declare whatsappAccount: WhatsappAccountEntity;

    public templates: Array<any> = [];

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
        this.setBreadcrumbItems();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub('whatsappTemplateList');
        this.setLoggedUser();
    }

    public async save(): Promise<void> {}

    public async pull(): Promise<void> {}

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
                route: '/dashboard/configurations/whatsapp-template-list'
            }
        ];
    }
}

type View = 1 | 2 | 3;
class Item {
    public declare label: string;
    public declare value: View;
}
