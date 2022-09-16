import { Component, OnInit } from '@angular/core';
import { UserEntity } from 'src/shared/models/entities/user.entity';
import { BreadcrumbService } from 'src/shared/services/breadcrumb/breadcrumb.service';
import { SideMenuService } from 'src/shared/services/side-menu/side-menu.service';
import { Storage } from 'src/shared/utils/storage';

@Component({
    selector: 'app-whatsapp',
    templateUrl: './whatsapp.component.html',
    styleUrls: ['./whatsapp.component.scss']
})
export class WhatsappComponent implements OnInit {
    public user: UserEntity = new UserEntity();
    public readonly subcomponents = Subcomponents;
    public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    public conversationSelected: any = null;

    //TODO: Change to WhatsappChat
    public chatRoom: ChatRoom = new ChatRoom();

    public constructor(public sideMenuService: SideMenuService, public breadcrumb: BreadcrumbService, public storage: Storage) {
        //no content
    }

    public ngOnInit(): void {
        console.log('Whatsapp loading...');
        this.user = (this.storage.getUser() as UserEntity) || new UserEntity();
        this.setBreadcrumb();
        this.sideMenuService.change('whatsapp');
        this.sideMenuService.changeSub('none');
        console.log('Whatsapp initialized!');
    }

    public onContactSelected(event: any): void {
        this.chatRoom.manager = new WhatsappManager();
        this.chatRoom.contact = new WhatsappContact();
        this.chatRoom.contact.name = event.name;
        this.chatRoom.contact.displayPhone = event.displayPhone;
    }

    private setBreadcrumb(): void {
        this.breadcrumb.items = [
            {
                name: 'Início',
                route: '/dashboard/reports'
            },
            {
                name: 'Whatsapp',
                route: '/dashboard/whatsapp'
            }
        ];
    }
}

export enum Subcomponents {
    ContactList = 'contact-list',
    ChatList = 'chat-list'
}

export class ChatRoom {
    public manager: WhatsappManager = new WhatsappManager();
    public contact: WhatsappContact = new WhatsappContact();
    public threads: Array<ThreadMessage> = [];
}

export class WhatsappManager {
    public name: string = 'Admin';
    public displayPhone: string = '+55 31 98339-0869';
}

export class WhatsappContact {
    public name: string = 'Daniel Cardoso';
    public displayPhone: string = '+55 31 98399-7508';
}

export class ThreadMessage {
    public id: string = '';
    public type: WhatsappMessageType = WhatsappMessageType.Template;
    public message: string = '';
    public status: WhatsappMessageStatus = WhatsappMessageStatus.Sent;
    public isBusiness: boolean = true;
    public isFirstMessageOfDay: boolean = false;
    public createdAt: Date = new Date();
    public updatedAt: Date = new Date();
    public deletedAt: Date | null = null;
}

export enum WhatsappMessageStatus {
    Deleted = 'deleted',
    Delivered = 'delivered',
    Failed = 'failed',
    Read = 'read',
    Sent = 'sent',
    Warning = 'warning'
}

export enum WhatsappMessageType {
    Text = 'text',
    Template = 'template'
}
