import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { ChatRoom } from '../../models/chat-room';
import { Subcomponents } from '../../models/subcomponents';
import { ChatFilters } from '../../models/chat-filters';

@Component({
    selector: 'chat-list',
    templateUrl: './chat-list.component.html',
    styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit, OnChanges {
    @Input() public isAdmin: boolean = false;
    @Input() public selectedFilter: string = ChatFilters.InProgress;
    @Output() public selectedFilterChange: EventEmitter<string> = new EventEmitter<string>();
    @Input() public filterLoading: boolean = false;
    @Input() public pullLoading: boolean = false;
    @Input() public currentSubcomponent: Subcomponents = Subcomponents.ChatList;
    @Output() public currentSubcomponentChange: EventEmitter<Subcomponents> = new EventEmitter<Subcomponents>();
    @Output() public filterChangeEvent: EventEmitter<string> = new EventEmitter<string>();
    @Output() public selectedConversationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() public pullNewConversationEvent: EventEmitter<any> = new EventEmitter<any>();
    @Output() public onScrollEvent: EventEmitter<void> = new EventEmitter<void>();
    @Input() public rooms: Map<string, ChatRoom> = new Map<string, ChatRoom>();
    @Input() public queueCount: number = 0;
    public readonly EMPTY_lIST_IMAGE_DIR: string = './../../../../../../assets/imgs/empty-chat-list.png';
    public readonly NEW_MESSAGE_IMAGE_DIR: string = './../../../../../../assets/imgs/new-message.png';

    public conversations: Array<[string, ChatRoom]> = [];
    public isCollapsedFilter: boolean = false;
    public filters: Map<string, boolean> = new Map([
        [ChatFilters.InProgress, true],
        [ChatFilters.Finished, false],
        [ChatFilters.Unread, false],
        [ChatFilters.Waiting, false]
    ]);

    public ngOnInit(): void {
        //no content
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (!!changes['rooms']) {
            this.conversations = Array.from(changes['rooms'].currentValue);
        }
        if (!!changes['selectedFilter']) {
            this.selectedFilter = changes['selectedFilter'].currentValue;
            this.selectFilter(this.selectedFilter, false);
        }
    }

    public newMessage(): void {
        this.currentSubcomponentChange.emit(Subcomponents.ContactList);
    }

    public onConversationSelected(roomSelected: ChatRoom): void {
        this.selectedConversationEvent.emit(roomSelected);
    }

    public selectFilter(filterName: string, propagateEvent: boolean = true): void {
        const entries: IterableIterator<[string, boolean]> = this.filters.entries();
        let iteratorResult: IteratorResult<[string, boolean]> | null = null;
        do {
            iteratorResult = entries.next();
            if (iteratorResult.done) continue;
            this.filters.set(iteratorResult.value[0], false);
        } while (!iteratorResult.done);
        this.filters.set(filterName, true);

        if (!propagateEvent) {
            return;
        }

        this.selectedFilter = filterName;
        this.selectedFilterChange.emit(this.selectedFilter);
        this.filterChangeEvent.emit(filterName);
    }

    public onScroll(): boolean {
        this.onScrollEvent.emit();
        return true;
    }

    public pullNewConversation(): void {
        this.pullNewConversationEvent.emit();
    }
}
