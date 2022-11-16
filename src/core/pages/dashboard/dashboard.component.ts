import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { UserService } from 'src/shared/services/user/user.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    public constructor(public userService: UserService, public storage: Storage) {}

    public async ngOnInit() {
        const user: UserEntity = await this.userService.myself();
        if (user) this.storage.setUser(user);
    }
}
