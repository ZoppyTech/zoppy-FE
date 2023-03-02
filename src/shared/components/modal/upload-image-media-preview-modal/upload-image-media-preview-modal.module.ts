import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { StaticLoadingModule } from '../../static-loading/static-loading.module';
import { UploadImageMediaPreviewModalComponent } from './upload-image-media-preview-modal.component';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule, InputModule, StaticLoadingModule],
    declarations: [UploadImageMediaPreviewModalComponent],
    exports: [UploadImageMediaPreviewModalComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UploadImageMediaPreviewModalModule {}
