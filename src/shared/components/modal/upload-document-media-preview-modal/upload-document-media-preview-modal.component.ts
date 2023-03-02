import { Component } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappMediaService } from 'src/shared/services/whatsapp-media/whatsapp-media.service';
import { ModalService } from '../modal.service';

@Component({
    selector: 'upload-document-media-preview-modal',
    templateUrl: './upload-document-media-preview-modal.component.html',
    styleUrls: ['./upload-document-media-preview-modal.component.scss']
})
export class UploadDocumentMediaPreviewModalComponent {
    public uploading: boolean = false;

    public constructor(
        public readonly wppMediaService: WhatsappMediaService,
        public readonly toast: ToastService,
        public modal: ModalService
    ) {}

    public ngOnInit() {}

    public async sendDocument(): Promise<void> {
        if (this.uploading) return;
        this.uploading = true;
        try {
            await this.wppMediaService.uploadDocument(this.modal.data.contactId, this.modal.data.fileData);
            this.modal.close();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar seu documento!');
        } finally {
            this.uploading = false;
        }
    }
}
