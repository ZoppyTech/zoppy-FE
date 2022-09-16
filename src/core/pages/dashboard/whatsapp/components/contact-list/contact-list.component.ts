import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastService } from '@lucarrloliveira/toast';
import { Subcomponents } from '../../whatsapp.component';

@Component({
    selector: 'contact-list',
    templateUrl: './contact-list.component.html',
    styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
    @Input() public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    @Output() public currentSubcomponentChange: EventEmitter<Subcomponents> = new EventEmitter<Subcomponents>();

    public syncContactsLoading: boolean = false;
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';
    public contacts: Array<ContactListView> = [];

    public constructor(public toast: ToastService) {
        this.contacts = [
            {
                hasIndex: false,
                name: 'Alexendre Kac'
            },
            {
                hasIndex: false,
                name: 'Alex Silva'
            },
            {
                hasIndex: false,
                name: 'Amanda Almeida'
            },
            {
                hasIndex: false,
                name: 'Andre Nunes'
            },
            {
                hasIndex: false,
                name: 'Ana Castro'
            },
            {
                hasIndex: false,
                name: 'Daniel Cardoso'
            },
            {
                hasIndex: false,
                name: 'Joao Machado'
            },
            {
                hasIndex: false,
                name: 'Karolina'
            },
            {
                hasIndex: false,
                name: 'Lucas Roscoe'
            },
            {
                hasIndex: false,
                name: 'Lucas Marques'
            }
        ];
        this.contacts = this.sortAndGroup(this.contacts);
    }

    private sortAndGroup(contacts: Array<ContactListView>): Array<ContactListView> {
        if (contacts.length <= 0) return [];
        //TODO: Sort in backend
        //contacts = contacts.sort();
        contacts[0].hasIndex = true;
        for (let i: number = 1; i < contacts.length; i++) {
            this.contacts[i].hasIndex =
                contacts[i].name.substring(0, 1).toUpperCase() !== contacts[i - 1].name.substring(0, 1).toUpperCase() ? true : false;
        }
        return contacts;
    }

    public ngOnInit(): void {
        console.log('init');
    }

    public goBack(): void {
        this.currentSubcomponentChange.emit(Subcomponents.ChatList);
    }

    public syncContacts(): void {
        this.toast.success(`Contatos sincronizados!`, `Sucesso!`);
    }
}

export class ContactListView {
    public hasIndex: boolean = false;
    public name: string = '';
}
