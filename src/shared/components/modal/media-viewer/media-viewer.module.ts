import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaViewerComponent } from './media-viewer.component';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule],
    declarations: [MediaViewerComponent],
    exports: [MediaViewerComponent]
})
export class MediaViewerModule {}
