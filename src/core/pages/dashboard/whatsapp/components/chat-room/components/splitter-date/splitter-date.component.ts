import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'splitter-date',
    templateUrl: './splitter-date.component.html',
    styleUrls: ['./splitter-date.component.scss']
})
export class SplitterDateComponent implements OnInit {
    @Input() public date: Date = new Date();
    @Input() public visible: boolean = false;

    public isToday: boolean = false;
    public isYesterday: boolean = false;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        this.validateDatetime();
    }

    public validateDatetime(): void {
        const differenceInDays: number = this.calculateDiff(this.date);
        if (differenceInDays === 0) this.isToday = true;
        if (differenceInDays === 1) this.isYesterday = true;
    }

    private calculateDiff(dateSent: Date): number {
        const currentDate: Date = new Date();
        dateSent = new Date(dateSent);
        return Math.floor(
            (Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()) -
                Date.UTC(dateSent.getFullYear(), dateSent.getMonth(), dateSent.getDate())) /
                (1000 * 60 * 60 * 24)
        );
    }
}
