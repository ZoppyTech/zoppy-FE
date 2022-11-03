import { Component, OnInit } from '@angular/core';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
    public loading: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        public storage: Storage,
        public modal: ModalService
    ) {}

    public ngOnInit() {
        this.sideMenuService.change('register-sale');
        this.setBreadcrumb();
    }

    public openInfoModal(): void {
        this.modal.open(Modal.IDENTIFIER.INFO, {
            title: 'Cadastro de produtos',
            button: 'Entendi',
            description: `IMPORTANTE! Após enviar a planilha com seus produtos, você não poderá editar ou apagá-los. Para cadastrar novos produtos, baixe novamente a planilha e insira <b>somente</b> aqueles que ainda não foram enviados. Se inserir produtos que já foram cadastrados, eles ficarão duplicados na plataforma.`
        });
    }

    public async save(): Promise<void> {}

    public async download(): Promise<void> {}

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Cadastro de produtos`,
                route: undefined
            }
        ];
    }
}
