import { Component } from '@angular/core';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';

@Component({
    selector: 'app-campaign',
    templateUrl: './campaign.component.html',
    styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent {
    public constructor(public sideMenuService: SideMenuService) {}

    public ngOnInit() {
        this.sideMenuService.change('configurations');
        this.sideMenuService.changeSub('campaigns');
    }
}
