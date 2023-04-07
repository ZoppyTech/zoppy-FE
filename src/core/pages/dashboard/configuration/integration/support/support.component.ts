import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-support',
    templateUrl: './support.component.html',
    styleUrls: ['./support.component.scss']
})
export class SupportComponent {
    public form: SupportForm = new SupportForm();
    public hoverMenu: boolean = false;

    @Input() public open: boolean = false;
    @Input() public identifier: string = '';
    @Output() public openChange: EventEmitter<boolean> = new EventEmitter();

    public close(force: boolean = false): void {
        if (this.hoverMenu && !force) return;
        this.open = false;
        this.openChange.emit(this.open);
    }

    public ngOnInit(): void {
        this.setForm();
    }

    public openSupport(): void {
        window?.open(this.form.link, '_blank')?.focus();
    }

    private setForm(): void {
        switch (this.identifier) {
            case 'whatsapp':
                return this.setWppForm();
            case 'dooca':
                return this.setDoocaForm();
            case 'bagy':
                return this.setBagyForm();
            case 'nuvemshop':
                return this.setNuvemshopForm();
        }
    }

    private setWppForm(): void {
        this.form = {
            title: 'Whatsapp',
            label: 'Configuração com o Whatsapp Business',
            link: 'https://wa.me/message/7XWZOLXUFLNOM1',
            description:
                'A integração com o Whatsapp Business é um pouco mais complexa, por isso, sugerimos que você entre em contato com o nosso suporte para obter ajuda nessa integração, aproveite também para tirar suas dúvidas!'
        };
    }

    private setDoocaForm(): void {
        this.form = {
            title: 'Dooca',
            label: 'Cadastrar chaves na Dooca',
            link: 'https://wa.me/message/7XWZOLXUFLNOM1',
            description:
                'A integração com a Dooca é um pouco mais complexa, por isso, sugerimos que você entre em contato com o nosso suporte para obter ajuda nessa integração, aproveite também para tirar suas dúvidas!'
        };
    }

    private setBagyForm(): void {
        this.form = {
            title: 'Bagy',
            label: 'Cadastrar chaves na Bagy',
            link: 'https://wa.me/message/7XWZOLXUFLNOM1',
            description:
                'A integração com a Bagy é um pouco mais complexa, por isso, sugerimos que você entre em contato com o nosso suporte para obter ajuda nessa integração, aproveite também para tirar suas dúvidas!'
        };
    }

    private setNuvemshopForm(): void {
        this.form = {
            title: 'Nuvemshop',
            label: 'Cadastre suas chaves',
            link: 'https://wa.me/message/7XWZOLXUFLNOM1',
            description:
                'A integração com a Nuvemshop é um pouco mais complexa, por isso, sugerimos que você entre em contato com o nosso suporte para obter ajuda nessa integração, aproveite também para tirar suas dúvidas!'
        };
    }
}

class SupportForm {
    public declare title: string;
    public declare label: string;
    public declare description: string;
    public declare link: string;
}
