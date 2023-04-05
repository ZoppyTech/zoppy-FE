import { ToastService } from '@ZoppyTech/toast';
import { Component, OnInit } from '@angular/core';
import { WhatsappConversationService } from 'src/shared/services/whatsapp-conversation/whatsapp-conversation.service';
import { ModalService } from '../modal.service';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappConstants } from '@ZoppyTech/utilities';
import { WhatsappConversationEntity } from 'src/shared/models/entities/whatsapp-conversation.entity';
import { WhatsappConversationRequest } from 'src/shared/models/requests/whatsapp-conversation/whatsapp-conversation.request';
import { WhatsappAccountManagerEntity } from 'src/shared/models/entities/whatsapp-account-manager.entity';
import { WhatsappAccountManagerService } from 'src/shared/services/whatsapp-account-manager/whatsapp-account-manager.service';

@Component({
    selector: 'chat-conversation-transfer-modal',
    templateUrl: './chat-conversation-transfer-modal.component.html',
    styleUrls: ['./chat-conversation-transfer-modal.component.scss']
})
export class ChatConversationTransferModalComponent implements OnInit {
    public transferLoading: boolean = false;
    public managersLoading: boolean = false;
    public managers: AccountManagerView[] = [];
    public declare managerSelected: AccountManagerView;

    public constructor(
        public readonly wppAccountManagerService: WhatsappAccountManagerService,
        public readonly wppConversationService: WhatsappConversationService,
        private readonly toast: ToastService,
        public modal: ModalService
    ) {}

    public async ngOnInit(): Promise<void> {
        await this.loadManagers();
    }

    public async loadManagers(): Promise<void> {
        try {
            if (this.managersLoading) return;
            this.managersLoading = true;
            const entities: WhatsappAccountManagerEntity[] = await this.wppAccountManagerService.list(this.modal.data.wppAccountId);
            this.mapToView(entities);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.managersLoading = false;
        }
    }

    public onManagerSelected(manager: AccountManagerView): void {
        this.managers.map((manager: AccountManagerView) => {
            manager.selected = false;
            return manager;
        });
        manager.selected = true;
        this.managerSelected = manager;
    }

    public async transfer(): Promise<void> {
        try {
            if (!this.managerSelected) return;
            if (this.transferLoading) return;
            this.transferLoading = true;
            const request: WhatsappConversationRequest = {
                ticket: this.modal.data.ticket,
                wppContactId: this.modal.data.wppContactId,
                wppManagerId: this.managerSelected.id
            };
            const conversationTransfered: WhatsappConversationEntity = await this.wppConversationService.transfer(
                this.modal.data.id,
                request
            );
            this.modal.close(true, conversationTransfered);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, WhatsappConstants.ToastTitles.Error);
        } finally {
            this.transferLoading = false;
        }
    }

    private mapToView(entities: WhatsappAccountManagerEntity[]): void {
        this.managers = entities.map((entity: WhatsappAccountManagerEntity) => {
            return {
                ...entity,
                selected: false
            } as AccountManagerView;
        });
    }
}

export class AccountManagerView extends WhatsappAccountManagerEntity {
    public selected: boolean = false;
}
