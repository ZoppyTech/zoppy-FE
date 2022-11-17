import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'input-info',
    templateUrl: './input-info.component.html',
    styleUrls: ['./input-info.component.scss']
})
export class InputInfoComponent {
    public constructor(public modal: ModalService) {}
}
