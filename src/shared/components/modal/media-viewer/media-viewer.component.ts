import { Component } from '@angular/core';
import { ModalService } from '../modal.service';

@Component({
    selector: 'media-viewer',
    templateUrl: './media-viewer.component.html',
    styleUrls: ['./media-viewer.component.scss']
})
export class MediaViewerComponent {
    public constructor(public modal: ModalService) {}
}
