import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-top-bar',
    templateUrl: './top-bar.component.html',
    styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {
    public user: UserEntity | undefined = undefined;

    public constructor(private readonly storage: Storage) {}

    public ngOnInit() {
        this.user = this.storage.getUser() as UserEntity;
    }
}
