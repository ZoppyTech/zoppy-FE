import { Component, OnInit } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'sales-panel-contact',
    templateUrl: './sales-panel-contact.component.html',
    styleUrls: ['./sales-panel-contact.component.scss']
})
export class SalesPanelContactComponent implements OnInit {
    public constructor(public modal: ModalService) {}

    public ngOnInit() {}
}
