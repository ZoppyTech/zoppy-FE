import { Component, Input } from '@angular/core';
import { Modal, ModalService } from 'src/shared/components/modal/modal.service';
import { ThreadMediaMessage } from '../../../../models/thread-message';

@Component({
    selector: 'image-message',
    templateUrl: './image-message.component.html',
    styleUrls: ['./image-message.component.scss']
})
export class ImageMessageComponent {
    @Input() public media?: ThreadMediaMessage | null = new ThreadMediaMessage();

    public constructor(public modal: ModalService) {
        //no content
    }

    public async ngOnInit(): Promise<void> {
        setTimeout(() => {}, 1000);
    }

    public openMediaViewerModal(): void {
        this.modal.open(Modal.IDENTIFIER.MEDIA_VIEWER_MODAL, {
            url: this.media?.url
        });
    }
}
