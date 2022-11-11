import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'chat-contact',
    templateUrl: './chat-contact.component.html',
    styleUrls: ['./chat-contact.component.scss']
})
export class ChatContactComponent {
    public constructor(public modal: ModalService) {}
}
