import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService) {}

    public ngOnInit() {
        this.sideMenuService.change(`reports`);
    }
}
