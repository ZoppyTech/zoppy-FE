import { Component, OnInit } from '@angular/core';
import { ConfirmActionService } from '@ZoppyTech/confirm-action';
import { ToastService } from '@ZoppyTech/toast';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { ExternalTokenEntity } from 'src/shared/models/entities/external-token.entity';
import { ExternalTokenRequest } from 'src/shared/models/requests/external-token/external-token.request';
import { BooleanResponse, ZoppyException } from 'src/shared/services/api.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { ExternalTokenService } from 'src/shared/services/external-token/external-token.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-access-tokens',
    templateUrl: './access-tokens.component.html',
    styleUrls: ['./access-tokens.component.scss']
})
export class AccessTokensComponent implements OnInit {
    public loading: boolean = false;
    public token: ExternalTokenRequest = {
        hash: ``,
        active: true
    };

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public confirmActionService: ConfirmActionService,
        public modal: ModalService,
        private readonly externalTokenService: ExternalTokenService,
        private readonly toast: ToastService
    ) {}

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Cadastrando suas chaves de Acesso?',
            button: 'Entendi',
            description: `Nada melhor do que ter uma <b>solução personalizada</b> pro seu
              negócio e <b>totalmente automatizada</b>, né? Essa etapa vem
              para concretizar isso, auziliando a Zoppy a entender mais sobre como funcionam as vendas no seu ecommerce.`
        });
    }

    public async ngOnInit(): Promise<void> {
        this.sideMenuService.changeSub(`accessTokens`);
        this.sideMenuService.change('configurations');
        this.generateBreadcrumb();
        await this.fetchData();
    }

    public async generateToken(): Promise<void> {
        try {
            this.loading = true;
            this.token = (await this.externalTokenService.create()) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível gerar seu Token');
        } finally {
            this.loading = false;
        }
    }

    public async deleteToken(): Promise<void> {
        this.confirmActionService.open(
            'Deletar o token',
            'Tem certeza que deseja deletar seu token? Ele não funcionará mais em nenhuma integração',
            async (result: boolean) => {
                if (!result) return;
                try {
                    this.loading = true;
                    await this.externalTokenService.destroy(this.token.id as string);
                    await this.fetchData();
                    this.toast.success('Esse token foi removido e não pode ser mais usado', 'Token removido com sucesso!');
                } catch (ex: any) {
                    ex = ex as ZoppyException;
                    this.toast.error(ex.message, 'Não foi possível gerar seu Token');
                } finally {
                    this.loading = false;
                }
            }
        );
    }

    public copyToClipboard(): void {
        navigator.clipboard.writeText(this.token.hash as string);
        this.toast.success('Token copiado para a área de transferência', `Copiado!`);
    }

    private generateBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: undefined
            },
            {
                name: `Configurações`,
                route: undefined
            },
            {
                name: `Tokens de Acesso`,
                route: `/dashboard/configurations/access-tokens`
            }
        ];
    }

    private async fetchData(): Promise<void> {
        try {
            this.token = (await this.externalTokenService.findLatestActive()) || {};
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível obter seu Token');
        }
    }
}
