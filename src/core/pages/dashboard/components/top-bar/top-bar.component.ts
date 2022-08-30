import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { PublicService } from 'src/shared/services/public/public.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    public user: UserEntity | undefined = undefined;

    public constructor(private readonly storage: Storage, public publicService: PublicService, public breadcrumb: BreadcrumbService) {}

    public ngOnInit() {
        this.user = this.storage.getUser() as UserEntity;
    }
}
