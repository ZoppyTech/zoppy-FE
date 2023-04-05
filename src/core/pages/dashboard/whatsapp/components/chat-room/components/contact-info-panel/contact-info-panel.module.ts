import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactInfoPanelComponent } from './contact-info-panel.component';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ContactModule } from '@ZoppyTech/contact';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';

@NgModule({
    declarations: [ContactInfoPanelComponent],
    imports: [CommonModule, VisualIdentityModule, IconModule, VisualIdentityModule, ContactModule, StaticLoadingModule],
    exports: [ContactInfoPanelComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ContactInfoPanelModule {}
