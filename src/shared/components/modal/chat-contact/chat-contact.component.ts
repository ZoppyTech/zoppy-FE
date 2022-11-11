import { Component, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { WhatsappContactEntity } from 'src/shared/models/entities/whatsapp-contact.entity';
import { WhatsappContactRequest } from 'src/shared/models/requests/whatsapp-contact/whatsapp-contact.request';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappContactService } from 'src/shared/services/whatsapp-contact/whatsapp-contact.service';
import { ModalService } from '../modal.service';

@Component({
    selector: 'chat-contact',
    templateUrl: './chat-contact.component.html',
    styleUrls: ['./chat-contact.component.scss']
})
export class ChatContactComponent {
    public addContactLoading: boolean = false;
    public updateContactLoading: boolean = false;

    public constructor(
        public readonly wppContactService: WhatsappContactService,
        private readonly toast: ToastService,
        public modal: ModalService
    ) {}

    public async addContact(): Promise<void> {
        this.addContactLoading = true;
        try {
            debugger;
            this.validateFields();
            console.log(this.modal.data.phoneNumber);
            const request: WhatsappContactRequest = {
                firstName: this.modal.data.firstName.trim(),
                lastName: this.modal.data.lastName.trim(),
                countryCode: '55',
                subdivisionCode: this.getOnlySubdivisionCode(),
                phoneNumber: this.getOnlyPhoneNumber(),
                isBlocked: false
            };
            const createdContact: WhatsappContactEntity = await this.wppContactService.create(request);
            this.toast.success('Novo contato adicionado', 'Sucesso!');
            this.modal.callback = () => {
                return createdContact;
            };
            this.modal.close(true);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.addContactLoading = false;
        }
    }
    public async updateContact(): Promise<void> {}
    public async toggleContactBlocking(): Promise<void> {}

    private getOnlyPhoneNumber(): string {
        return this.modal.data.phoneNumber.substring(2, this.modal.data.phoneNumber.length);
    }

    private getOnlySubdivisionCode(): string {
        return this.modal.data.phoneNumber.substring(0, 2);
    }

    private validateFields(): void {
        if (!this.modal.data.firstName) throw Error('Primeiro nome obrigatório');
        if (!this.modal.data.lastName) throw Error('Último nome');
        if (!this.modal.data.phoneNumber) throw Error('Número do Whatsapp');
    }
}
