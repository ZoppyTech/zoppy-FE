import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-message-template',
    templateUrl: './message-template.component.html',
    styleUrls: ['./message-template.component.scss']
})
export class MessageTemplateComponent implements OnInit {
    public constructor(public sideMenuService: SideMenuService) {}

    public ngOnInit() {
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub('messageTemplate');
    }
}
