import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { DashboardResponse } from 'src/shared/models/responses/dashboard/dashboard.response';
import { ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { DashboardService } from 'src/shared/services/dashboard/dashboard.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Navigation, Pages } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        private readonly dashboardService: DashboardService,
        private readonly toast: ToastService,
        private readonly router: Router
    ) {}

    public user: UserEntity = new UserEntity();
    public dashboard: DashboardResponse = new DashboardResponse();
    public items: Array<Item> = [];
    public cards: Array<Card> = [];
    public posts: Array<Post> = [];
    public visiblePost: number = 0;
    public percent: number = 0;

    public async ngOnInit() {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.sideMenuService.change(`home`);
        this.setBreadcrumb();
        await this.fetchDashboardData();
    }

    private async fetchDashboardData(): Promise<void> {
        try {
            this.dashboard = await this.dashboardService.fetchOne();
            this.setItems();
            this.setCards();
            this.setPosts();
            this.setPercentage();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter o dashboard');
        }
    }

    private setItems(): void {
        this.items = [
            {
                title: 'Criação de conta na plataforma',
                label: 'Forneça seus dados para criarmos a sua conta na plataforma.',
                completed: this.dashboard.accountCreated,
                route: undefined
            },
            {
                title: 'Preencher dados da empresa',
                label: 'Preencha seu CNPJ para podermos concluir com a sua integração.',
                completed: this.dashboard.companyFilled,
                route: Navigation.routes.myCompanyConfig as Pages
            },
            {
                title: 'Cadastrar chaves de acesso',
                label: 'Cadastre as chaves de acesso para integrasmos com seu Ecommerce.',
                completed: this.dashboard.accessKeysCreated,
                route: Navigation.routes.accessKeys as Pages
            },
            {
                title: 'Configurar token de acesso',
                label: 'Configure um token de acesso para autenticar a nossa plataforma.',
                completed: this.dashboard.accessTokenCreated,
                route: Navigation.routes.accessTokens as Pages
            },
            {
                title: 'Configurar seu giftback',
                label: 'Configure os padrões de giftback automático por compra concluída.',
                completed: this.dashboard.giftbackConfigCreated,
                route: Navigation.routes.giftback as Pages
            },
            {
                title: 'Sincronizar seus dados',
                label: 'Importe cupons, pedidos, produtos e clientes para seu Ecommerce.',
                completed: this.dashboard.syncDataConcluded,
                route: Navigation.routes.syncData as Pages
            }
        ];
    }

    private setCards(): void {
        this.cards = [
            {
                value: this.dashboard.invoice,
                title: 'Faturamento (Últimos 30 dias)',
                image: './assets/imgs/dashboard_2.png',
                imageMobile: './assets/imgs/landing-circle.png'
            },
            {
                value: this.dashboard.salesCount.toString() + ' vendas',
                title: 'Vendas concluídas (Últimos 30 dias)',
                image: './assets/imgs/dashboard_1.png',
                imageMobile: './assets/imgs/landing-circle.png'
            }
        ];
    }

    private setPosts(): void {
        this.posts = [
            {
                title: 'Como uma gigante do varejo conseguiu fidelizar seus clientes',
                image: './assets/imgs/post_1.png'
            },
            {
                title: 'Como fazer com que seus clientes comprem mais vezes e gastando mais',
                image: './assets/imgs/post_2.png'
            }
        ];
    }

    private setPercentage(): void {
        const completed: number = this.items.filter((item: Item) => item.completed).length;
        this.percent = Math.floor((completed / this.items.length) * 100);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            }
        ];
    }
}

interface Item {
    title: string;
    label: string;
    completed: boolean;
    route?: Pages | undefined;
}

interface Card {
    value: string;
    title: string;
    image: string;
    imageMobile: string;
}

interface Post {
    title: string;
    image: string;
}
