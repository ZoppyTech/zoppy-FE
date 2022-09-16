import { Component, Input, OnInit } from '@angular/core';
import { ThreadMessage } from '../../../../whatsapp.component';

@Component({
    selector: 'splitter-date',
    templateUrl: './splitter-date.component.html',
    styleUrls: ['./splitter-date.component.scss']
})
export class SplitterDateComponent implements OnInit {
    @Input() public thread: ThreadMessage = new ThreadMessage();
    @Input() public visible: boolean = false;

    public isToday: boolean = false;
    public isYesterday: boolean = false;

    public constructor() {
        // private dateProviderService: DateProviderService
    }

    public ngOnInit(): void {
        this.validateDatetime();
    }

    public validateDatetime(): void {
        // debugger;
        // const differenceInDays: number = this.calculateDiff(this.thread.createdAt);
        // if (differenceInDays === 0) this.isToday = true;
        // if (differenceInDays === 1) this.isYesterday = true;
    }

    // private calculateDiff(dateSent: Date): number {
    //     let currentDate = new Date();
    //     dateSent = new Date(dateSent);
    //     return Math.floor(
    //         (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
    //             Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) /
    //             (1000 * 60 * 60 * 24)
    //     );
    // }
}
