import { Component, Input, OnInit, QueryList, ViewChildren } from '@angular/core';

@Component({
    selector: 'app-carrossel',
    templateUrl: './carrossel.component.html',
    styleUrls: ['./carrossel.component.scss']
})
export class CarrosselComponent implements OnInit {
    @Input() public items: Array<CarrosselItem> = [];
    @ViewChildren('item') public domItems: QueryList<any> | undefined = undefined;
    public itemVisible: number = 1;
    public itemWidth: number = 0;

    public constructor() {}

    public ngOnInit(): void {
        this.setDefaultItems();
        setInterval(() => {
            if (this.itemVisible === 3) this.itemVisible = 1;
            else this.itemVisible++;
            console.log(this.itemVisible);
        }, 12000);
    }

    public select(item: CarrosselItem): void {
        this.itemVisible = item.id;
    }

    private setDefaultItems(): void {
        if (this.items.length > 0) return;
        this.items = [
            {
                id: 1,
                image: './assets/imgs/carrossel_dashboard.jpg',
                title: 'Dashboards',
                subtitle:
                    'Tenha acesso aos dados e padrôes de consumo do seu público e, com isso, tome decisões embasadas em dados e melhore ainda mais seus resultados. </br> <string>Dica: </strong> A Matriz RFM da Zoppy é feita exatamente para você trabalhar cadapúblico de maneira personalizada!'
            },
            {
                id: 2,
                image: './assets/imgs/carrossel_ads.jpg',
                title: 'Zoppy Ads',
                subtitle:
                    'As campanhas da Zoppy são feitas exatamente para que você tenha mais uma opção de aquisição e retenção de clientes, trabalhando sua própria base da melhor maneira possível. </br> <string>Dica: </strong> Contate o seu gestor de contas e gere a melhor campanha personalizada para o seu negócio!'
            },
            {
                id: 3,
                image: './assets/imgs/carrossel_engage.jpg',
                title: 'Engajamento de clientes',
                subtitle:
                    'Conquistar um cliente não significa atrair ele para realizar apenas uma compra, mas sim criar um relacionamento duradouro que está sempre incentivando compras recorrentes! </br> <string>Dica: </strong> Aumente o LTV do seu negócio através de programas de giftback, pontos por compra ou assinaturas dos seus produtos.'
            }
        ];
    }
}

export class CarrosselItem {
    public declare id: number;
    public declare image: string;
    public declare title: string;
    public declare subtitle: string;
}
