import { Component } from '@angular/core';
import { ToastService } from '@ZoppyTech/toast';
import { ZoppyException } from 'src/shared/services/api.service';
import { WhatsappMediaService } from 'src/shared/services/whatsapp-media/whatsapp-media.service';
import { ModalService } from '../modal.service';

@Component({
    selector: 'upload-image-media-preview-modal',
    templateUrl: './upload-image-media-preview-modal.component.html',
    styleUrls: ['./upload-image-media-preview-modal.component.scss']
})
export class UploadImageMediaPreviewModalComponent {
    public uploading: boolean = false;

    public constructor(
        public readonly wppMediaService: WhatsappMediaService,
        public readonly toast: ToastService,
        public modal: ModalService
    ) {}

    public ngOnInit() {
        const reader: any = new FileReader();
        reader.onload = function (e: any) {
            document.getElementById('image-wrapper')?.setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(this.modal.data.fileData);
    }

    public async sendImage(): Promise<void> {
        if (this.uploading) return;
        this.uploading = true;
        try {
            await this.wppMediaService.uploadImage(this.modal.data.contactId, this.modal.data.fileData);
            this.modal.close();
        } catch (ex: any) {
            ex = ex as ZoppyException;
            this.toast.error(ex.message, 'Não foi possível adicionar sua imagem!');
        } finally {
            this.uploading = false;
        }
    }
}
