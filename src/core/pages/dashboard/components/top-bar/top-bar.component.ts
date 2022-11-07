import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    public user: UserEntity | undefined = undefined;
    public barItems: Item[] = [
        {
            label: 'Configurar Integrações',
            route: Navigation.routes.configuration,
            class: 'desktop'
        },
        {
            label: 'Minha Conta',
            route: Navigation.routes.profile,
            class: ''
        },
        {
            label: 'Minha Empresa',
            route: Navigation.routes.myCompanyConfig,
            class: ''
        },
        {
            label: 'WhatsApp',
            route: Navigation.routes.whatsappConfig,
            class: ''
        },
        {
            label: 'Usuários',
            route: Navigation.routes.myCompanyUsers,
            class: ''
        }
    ];

    public constructor(
        private readonly storage: Storage,
        public publicService: PublicService,
        public breadcrumb: BreadcrumbService,
        public sideMenuService: SideMenuService,
        public router: Router
    ) {}

    public ngOnInit() {
        this.user = this.storage.getUser() as UserEntity;
    }

    public navigateToWhatsapp(): void {
        this.router.navigate([Navigation.routes.whatsapp]);
    }
}

interface Item {
    label: string;
    route: string;
    class: string;
}
