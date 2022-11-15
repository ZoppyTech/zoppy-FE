import { Component, Input, OnInit } from '@angular/core';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';

@Component({
    selector: 'activation-pending-card',
    templateUrl: './activation-pending-card.component.html',
    styleUrls: ['./activation-pending-card.component.scss']
})
export class ActivationPendingCardComponent implements OnInit {
    @Input() public account: WhatsappAccountEntity | null = null;
    public readonly CHAT_UPGRADE_IN_PROGRESS_IMAGE_DIR: string = './../../../../../../assets/imgs/chat_upgrade_in_progress.png';

    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }
}
