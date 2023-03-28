import { Component, Input } from '@angular/core';
import { ThreadMediaMessage } from '../../../../models/thread-message';

@Component({
    selector: 'document-message',
    templateUrl: './document-message.component.html',
    styleUrls: ['./document-message.component.scss']
})
export class DocumentMessageComponent {
    @Input() public media?: ThreadMediaMessage;
    @Input() public isBusinessUser: boolean = true;

    protected fileUnits: Array<string> = ['KB', 'MB', 'GB', 'TB'];
    protected fileUnit: string = 'KB';
    protected fileSizeConverted: string = '0 KB';

    public constructor() {
        //no content
    }

    public ngOnInit(): void {
        this.fileSizeConverted = this.fileConverter(this.media?.fileSize ?? 0);
        console.log('init');
    }

    private fileConverter(fileSize: number): string {
        const fileUnits: Array<string> = ['KB', 'MB', 'GB', 'TB'];
        fileSize /= 1024;
        let conversionsNumber: number = 0;
        while (fileSize >= 1024) {
            fileSize /= 1024;
            ++conversionsNumber;
        }
        return `${fileSize.toFixed(2)} ${fileUnits[conversionsNumber]} - ${this.media?.mimeType}`;
    }
}
