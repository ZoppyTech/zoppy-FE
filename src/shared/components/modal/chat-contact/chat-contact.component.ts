import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'chat-contact',
    templateUrl: './chat-contact.component.html',
    styleUrls: ['./chat-contact.component.scss']
})
export class ChatContactComponent {
    public constructor(public modal: ModalService) {}

    public async addContact(): Promise<void> {}
    public async updateContact(): Promise<void> {}
    public async toggleContactBlocking(): Promise<void> {}

    //id: '', firstName: '', lastName: '', phoneNumber: '', isBlocked: false
}
