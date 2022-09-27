import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { SharedModule } from 'src/shared/shared.module';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
@NgModule({
    declarations: [ContactListComponent],
    imports: [CommonModule, StaticLoadingModule, InputModule, ButtonModule, IconModule],
    exports: [ContactListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactListModule {}
