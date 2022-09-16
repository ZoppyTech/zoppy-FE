import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'text-message',
    templateUrl: './text-message.component.html',
    styleUrls: ['./text-message.component.scss']
})
export class TextMessageComponent implements OnInit {
    // @ViewChild('textContainer') public textContainer: any;
    @Input() public text: string = '';
    @Input() public isBusiness: boolean = true;
    @Input() public hasDeleted: boolean = false;

    public truncateEnable: boolean = false;
    public hideButtonVisible: boolean = false;

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }

    // public ngAfterViewInit(): void {
    //     setTimeout(() => {
    //         this.truncateEnable = this.isTruncated(this.textContainer?.nativeElement);
    //     }, 0);
    // }

    // public disableTruncate(): void {
    //     this.textContainer?.nativeElement.classList.remove('truncate-multiple-lines');
    // }

    // public enableTruncate(): void {
    //     this.textContainer?.nativeElement.classList.add('truncate-multiple-lines');
    // }

    // public isTruncated(element: any): boolean {
    //     return element ? element.offsetHeight < element.scrollHeight : false;
    // }

    // public readMore(): void {
    //     this.hideButtonVisible = true;
    //     this.disableTruncate();
    // }

    // public hide(): void {
    //     this.hideButtonVisible = false;
    //     this.enableTruncate();
    // }
}
