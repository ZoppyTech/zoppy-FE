import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChatRoom } from '../../models/chat-room';
import { Subcomponents } from '../../models/subcomponents';
import { ChatFilters } from '../../models/chat-filters';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
    @Input() public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    @Output() public currentSubcomponentChange: EventEmitter<Subcomponents> = new EventEmitter<Subcomponents>();
    @Output() public filterChangeEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public selectedConversationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() public pullNewConversationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Input() public conversations: Array<[string, ChatRoom]> = new Array<[string, ChatRoom]>();
    @Input() public queueCount: number = 0;
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';
    public readonly NEW_MESSAGE_IMAGE_DIR: string = './../../../../../../assets/imgs/new-message.png';
    public isCollapsedFilter: boolean = false;
    public filters: Map<string, boolean> = new Map([
        [ChatFilters.InProgress, true],
        [ChatFilters.Finished, false],
        [ChatFilters.Unread, false]
    ]);

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
        const entries: IterableIterator<[string, boolean]> = this.filters.entries();
        let iteratorResult: IteratorResult<[string, boolean]> | null = null;
        do {
            iteratorResult = entries.next();
            if (iteratorResult.done) continue;
            this.filters.set(iteratorResult.value[0], false);
        } while (!iteratorResult.done);
        this.filters.set(filterName, true);
        this.filterChangeEvent.emit(filterName);
    }

    public pullNewConversation(): void {
        debugger;
        this.pullNewConversationEvent.emit();
    }
}
