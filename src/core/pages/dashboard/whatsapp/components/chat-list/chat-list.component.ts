import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatRoom } from '../../models/chat-room';
import { Subcomponents } from '../../models/subcomponents';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
    @Input() public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    @Output() public currentSubcomponentChange: EventEmitter<Subcomponents> = new EventEmitter<Subcomponents>();
    @Output() public selectedConversationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() public conversations: Array<[string, ChatRoom]> = new Array<[string, ChatRoom]>();
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';
    public readonly NEW_MESSAGE_IMAGE_DIR: string = './../../../../../../assets/imgs/new-message.png';

    public filters: Map<string, boolean> = new Map([
        ['recent', false],
        ['in-progress', false],
        ['finished', false],
        ['unread', false]
    ]);

    public isCollapsedFilter: boolean = false;

    //public filterCount: number = 0;

    public constructor() {}

    public ngOnInit(): void {
        console.log('Start Chat List Component');
    }

    public newMessage(): void {
        this.currentSubcomponentChange.emit(Subcomponents.ContactList);
    }

    public onConversationSelected(chatRoomSelected: ChatRoom): void {
        this.selectedConversationEvent.emit(chatRoomSelected);
    }

    public selectFilter(filterName: string): void {
        this.filters.set(filterName, !this.filters.get(filterName));
        // this.filterCount = this.countSelectedFilters();
    }

    public pullNewCustomer(): void {}

    // public countSelectedFilters(): number {
    //     let counter: number = 0;
    //     const currFilter: IterableIterator<boolean> = this.filters.values();
    //     while (currFilter.next().done) {
    //         if (!currFilter.next().value) {
    //             continue;
    //         }
    //         ++counter;
    //     }
    //     return counter;
    // }
}
