import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappConstants } from 'src/shared/constants/whatsapp.constants';
import { WhatsappAccountEntity } from 'src/shared/models/entities/whatsapp-account.entity';
import { SignWhatsappAccountRequest } from 'src/shared/models/requests/whatsapp-account/sign-whatsapp-account.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappAccountService } from 'src/shared/services/whatsapp-account/whatsapp-account.service';

@Component({
    selector: 'restricted-access',
    templateUrl: './restricted-access.component.html',
    styleUrls: ['./restricted-access.component.scss']
})
export class RestrictedAccessComponent implements OnInit {
    @Input() public isWhatsappActive: boolean = false;
    @Output() public isWhatsappActiveChange: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() public startWhatsappAppEvent: EventEmitter<void> = new EventEmitter<void>();

    public accountEntity: WhatsappAccountEntity | null = null;

    public whatsappAccountLoading: boolean = true;
    public upgradePending: boolean = false;
    public activationPending: boolean = false;

    public constructor(public readonly wppAccountService: WhatsappAccountService, private readonly toast: ToastService) {
        //no content
    }
    public async ngOnInit(): Promise<void> {
        console.log('Check if whatsapp app is registered...');
        await this.loadRegisteredWhatsappAccount();
    }

    public async loadRegisteredWhatsappAccount(): Promise<void> {
        this.whatsappAccountLoading = true;
        try {
            this.accountEntity = await this.wppAccountService.getRegisteredByCompany();
            this.startWhatsappAppEvent.emit();
            this.setWhatsappActive();
        } catch (ex: any) {
            this.setWhatsappActive();
        } finally {
            this.whatsappAccountLoading = false;
        }
    }

    public async onUpgradeWhatsappAccount(upgradedAccount: WhatsappAccountEntity): Promise<void> {
        this.accountEntity = upgradedAccount;
        this.setWhatsappActive();
    }

    private setWhatsappActive(): void {
        this.upgradePending = !this.accountEntity;
        this.activationPending = !this.upgradePending && this.accountEntity?.active === false;
        this.isWhatsappActive = !this.upgradePending && !this.activationPending;
        this.isWhatsappActiveChange.emit(this.isWhatsappActive);
    }
}
