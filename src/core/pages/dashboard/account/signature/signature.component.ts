import { CompanyEntity } from './../../../../../shared/models/entities/company.entity';
import { PaymentMethodEntity } from './../../../../../shared/models/entities/payment-method.entity';
import { PaymentMethodService } from './../../../../../shared/services/payment-method/payment-method.service';
import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-signature',
    templateUrl: './signature.component.html',
    styleUrls: ['./signature.component.scss']
})
export class SignatureComponent implements OnInit {
    public user: UserEntity = new UserEntity();
    public company: CompanyEntity = new CompanyEntity();
    public loaded: boolean = false;
    public plan: Plan = {
        name: '',
        attributes: []
    };
    public state: number = 1;
    public paymentMethod: PaymentMethodView = new PaymentMethodView();
    public nextPaymentDate: Date = new Date();

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private readonly userService: UserService,
        private readonly paymentMethodService: PaymentMethodService,
        private readonly toast: ToastService,
        private readonly storage: Storage
    ) {}

    public async ngOnInit() {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.company = this.storage.getCompany() as UserEntity;
        this.setBreadcrumb();
        this.sideMenuService.change(`none`);
        this.sideMenuService.changeSubAccount(`signature`);
        setTimeout(async () => {
            this.nextPaymentDate = new Date(new Date().getFullYear(), new Date().getMonth() + 1, this.company.createdAt?.getDate());
            await this.fetchData();
            this.loaded = true;
        });
    }

    private async fetchData(): Promise<void> {
        this.paymentMethod = (await this.paymentMethodService.find()) as PaymentMethodView;
        debugger;
        if (!this.paymentMethod) return;
        switch (this.paymentMethod.flag) {
            case 'visa':
                this.paymentMethod.img = './assets/svg/visa.svg';
                break;
            case 'american_express':
                this.paymentMethod.img = './assets/svg/american_express.svg';
                break;
            case 'mastercard':
                this.paymentMethod.img = './assets/svg/mastercard.svg';
                break;
        }
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Assinatura`,
                route: Navigation.routes.profile
            }
        ];
    }
}

class PaymentMethodView extends PaymentMethodEntity {
    public declare img: string;
}

interface Plan {
    name: string;
    attributes: string[];
}
