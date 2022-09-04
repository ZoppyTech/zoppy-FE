import { Component, OnInit } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'ps-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    public constructor(public service: ModalService) {}
}
