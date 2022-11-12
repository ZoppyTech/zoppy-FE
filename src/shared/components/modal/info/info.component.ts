import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'info',
    templateUrl: './info.component.html',
    styleUrls: ['./info.component.scss']
})
export class InfoComponent {
    public constructor(public modal: ModalService) {}
}
