import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { UserService } from 'src/shared/services/user/user.service';
import { Navigation } from 'src/shared/utils/navigation';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-update-password',
    templateUrl: './update-password.component.html',
    styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent implements OnInit {
    public user: UserEntity = new UserEntity();
    public loading: boolean = false;

    public constructor(
        public sideMenuService: SideMenuService,
        public breadcrumb: BreadcrumbService,
        private readonly userService: UserService,
        private readonly toast: ToastService,
        private readonly storage: Storage
    ) {}

    public ngOnInit() {
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.setBreadcrumb();
        this.sideMenuService.change(`none`);
        this.sideMenuService.changeSubAccount(`updatePassword`);
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: `Início`,
                route: Navigation.routes.home
            },
            {
                name: `Redefinir senha`,
                route: Navigation.routes.updatePassword
            }
        ];
    }
}
