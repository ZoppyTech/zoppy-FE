import { Component, Input, OnInit } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { FileUtils } from '@ZoppyTech/utilities';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappMediaService } from 'src/shared/services/whatsapp-media/whatsapp-media.service';
import { ThreadMessage } from '../../../../models/thread-message';

@Component({
    selector: 'thread-message',
    templateUrl: './thread-message.component.html',
    styleUrls: ['./thread-message.component.scss']
})
export class ThreadMessageComponent implements OnInit {
    @Input() public thread: ThreadMessage = new ThreadMessage();
    @Input() public replyEnabled: boolean = false;
    @Input() public deleteEnabled: boolean = false;
    public isHovered: boolean = false;
    public downloading: boolean = false;

    public constructor(private readonly whatsappMediaService: WhatsappMediaService, private readonly toast: ToastService) {
        //no content
    }

    public ngOnInit(): void {
        console.log('init');
    }

    public async download(): Promise<void> {
        debugger;
        if (this.downloading) return;
        this.downloading = true;
        try {
            if (!this.thread?.media?.id) return;
            const blob: any = await this.whatsappMediaService.downloadMedia(this.thread.media.id);
            debugger;
            FileUtils.downloadBlob(this.thread.media.caption, blob);
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Erro!');
        } finally {
            this.downloading = false;
        }
    }
}
