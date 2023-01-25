import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'message-config-params',
    templateUrl: './message-config-params.component.html',
    styleUrls: ['./message-config-params.component.scss']
})
export class MessageConfigParamsComponent {
    public constructor(public modal: ModalService) {}

    public params: Param[] = [
        {
            name: '{{client_name}}',
            description: 'O primeiro nome do cliente'
        },
        {
            name: '{{name}}',
            description: 'Seu nome'
        },
        {
            name: '{{company_name}}',
            description: 'Nome Social da empresa'
        },
        {
            name: '{{last_purchase_date}}',
            description: 'Data da última compra do cliente'
        },
        {
            name: '{{nps_rating_link}}',
            description: 'Link para página de avaliação de satisfação'
        }
    ];
}

interface Param {
    name: string;
    description: string;
}
