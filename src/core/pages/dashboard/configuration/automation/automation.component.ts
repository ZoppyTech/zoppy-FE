import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/shared/components/modal/modal.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';
import { DashboardBasePage } from '../../dashboard.base.page';

@Component({
    selector: 'app-automation',
    templateUrl: './automation.component.html',
    styleUrls: ['./automation.component.scss']
})
export class AutomationComponent extends DashboardBasePage implements OnInit {
    public providers: ProviderCard[] = [];

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public modal: ModalService,
        public override storage: Storage,
        private readonly toast: ToastService,
        private readonly confirmAction: ConfirmActionService
    ) {
        super(storage);
    }

    public async ngOnInit() {
        this.setBreadcrumbItems();
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub(`automations`);
        this.setProviders();
    }

    private setBreadcrumbItems(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Automações`,
                route: Navigation.routes.automations
            }
        ];
    }

    private setProviders(): void {
        this.providers = [
            {
                name: 'Giftback',
                icon: 'icon-confirmation_number',
                description: 'Configure as propriedades de funcionamento dos giftbacks gerados pela Zoppy em sua loja!'
            },
            {
                name: 'Pós-venda',
                icon: 'icon-local_mall',
                description:
                    'Configure as propriedades da criação da tarefa de pós venda e defina o template da mensagem enviada nessa tarefa!'
            },
            {
                name: 'NPS',
                icon: 'icon-mood',
                description: 'Configure as propriedades da criação da tarefa de NPS e defina o template da mensagem enviada nessa tarefa!'
            },
            {
                name: 'Aniversário',
                icon: 'icon-cake',
                description: 'Configure a mensagem de aniversário que será enviada nas tarefas de aniversário!'
            },
            {
                name: 'Carrinho abandonado',
                icon: 'icon-shopping_cart',
                description:
                    'Configure as propriedades da criação da tarefa de carrinho abandonado e defina o template da mensagem enviada nessa tarefa!'
            },
            {
                name: 'Modelos de mensagem',
                icon: 'icon-wpp',
                description: 'Visualize e edite todos os modelos de mensagem disponíveis para ser utilizados em seus fluxos!'
            }
        ];
    }
}

interface ProviderCard {
    name: string;
    icon: string;
    description: string;
}
