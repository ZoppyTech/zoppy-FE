import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SignWhatsappAccountRequest } from 'src/shared/models/requests/whatsapp-account/sign-whatsapp-account.request';

@Component({
    selector: 'restricted-access',
    templateUrl: './restricted-access.component.html',
    styleUrls: ['./restricted-access.component.scss']
})
export class RestrictedAccessComponent implements OnInit {
    @Input() public isWhatsappActive: boolean = true;
    @Output() public isWhatsappActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    public readonly CHAT_LAYOUT_IMAGE_DIR: string = './../../../../../../assets/imgs/welcome-zoppy-chat.png';

    public declare businessName: string;
    public declare description: string;
    public declare phoneNumber: string;

    public declare signWhatsappRequest: SignWhatsappAccountRequest;

    public upgradeButtonLoading: boolean = false;

    public constructor() {
        //no content
    }
    public ngOnInit(): void {
        console.log('init');
    }

    public async upgrade(): Promise<void> {}
}
