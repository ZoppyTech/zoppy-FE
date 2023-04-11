import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';
import { ChatAccount } from '../../models/chat-account';

@Component({
    selector: 'restricted-access',
    templateUrl: './restricted-access.component.html',
    styleUrls: ['./restricted-access.component.scss']
})
export class RestrictedAccessComponent implements OnInit {
    @Input() public account: ChatAccount | null = null;

    public upgradePending: boolean = false;
    public activationPending: boolean = false;

    public constructor(public readonly wppAccountService: WhatsappAccountService, private readonly toast: ToastService) {
        //no content
    }
    public async ngOnInit(): Promise<void> {
        //console.log('Check if whatsapp app is registered...');
        this.setWhatsappActive();
    }

    public async onUpgradeWhatsappAccount(upgradedAccount: WhatsappAccountEntity): Promise<void> {
        this.account = upgradedAccount;
        this.setWhatsappActive();
    }

    private setWhatsappActive(): void {
        this.upgradePending = !this.account || !this.account.id;
        this.activationPending = !this.upgradePending && !this.account?.active;
    }
}
