import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UploadDocumentMediaPreviewModalComponent } from './upload-document-media-preview-modal.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { InputModule } from '@ZoppyTech/input';
import { StaticLoadingModule } from '../../static-loading/static-loading.module';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule, InputModule, StaticLoadingModule],
    declarations: [UploadDocumentMediaPreviewModalComponent],
    exports: [UploadDocumentMediaPreviewModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UploadDocumentMediaPreviewModalModule {}
