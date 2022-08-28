import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-my-company',
    templateUrl: './my-company.component.html',
    styleUrls: ['./my-company.component.scss']
})
export class MyCompanyComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService) {}

    public ngOnInit() {
        this.sideMenuService.change(`my-company`);
    }
}
