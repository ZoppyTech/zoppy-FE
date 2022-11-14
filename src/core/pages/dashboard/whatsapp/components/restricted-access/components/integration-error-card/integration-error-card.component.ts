import { Component, Input, OnInit } from '@angular/core';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';

@Component({
    selector: 'integration-error-card',
    templateUrl: './integration-error-card.component.html',
    styleUrls: ['./integration-error-card.component.scss']
})
export class IntegrationErrorCardComponent implements OnInit {
    @Input() public account: WhatsappAccountEntity | null = null;
    public readonly UNEXPECTED_ERROR_LOADING_CHAT_IMAGE_DIR: string = './../../../../../../assets/imgs/unavailable_service.png';
    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }
}
