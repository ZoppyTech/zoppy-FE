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
            name: '{{age}}',
            description: 'Idade do cliente'
        },
        {
            name: '{{birthday_day}}',
            description: 'Dia do aniversário do cliente'
        },
        {
            name: '{{birthday_month}}',
            description: 'Mês do aniversário do cliente'
        },
        {
            name: '{{client_first_name}}',
            description: 'Primeiro nome do cliente'
        },
        {
            name: '{{client_last_name}}',
            description: 'Último nome do cliente'
        },
        {
            name: '{{company_name}}',
            description: 'Nome da sua empresa'
        },
        {
            name: '{{giftback_amount}}',
            description: 'Valor do giftback'
        },
        {
            name: '{{giftback_code}}',
            description: 'Código do giftback'
        },
        {
            name: '{{giftback_expiry_date}}',
            description: 'Data de expiração do giftback'
        },
        {
            name: '{{giftback_minimum_purchase_value}}',
            description: 'Valor mínimo de compra para usar o giftback'
        },
        {
            name: '{{giftback_percent_value}}',
            description: 'Percentual do giftback em relação ao valor da compra'
        },
        {
            name: '{{last_purchase_date}}',
            description: 'Data da última compra'
        },
        {
            name: '{{nps_link}}',
            description: 'Link para responder a pesquisa de satisfação'
        },
        {
            name: '{{nps_product_rating}}',
            description: 'Nota do NPS de produto'
        },
        {
            name: '{{nps_rating}}',
            description: 'Nota média do NPS'
        },
        {
            name: '{{nps_service_rating}}',
            description: 'Nota do NPS de serviço'
        },
        {
            name: '{{product_list}}',
            description: 'Lista de produtos'
        },
        {
            name: '{{seller_name}}',
            description: 'Nome do vendedor'
        },
        {
            name: '{{store_url}}',
            description: 'Link para a sua loja'
        }
    ];
}

interface Param {
    name: string;
    description: string;
}
