import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-configuration',
    templateUrl: './configuration.component.html',
    styleUrls: ['./configuration.component.scss']
})
export class ConfigurationComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService) {}

    public ngOnInit() {
        this.sideMenuService.change(`configurations`);
    }
}
