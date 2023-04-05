import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnregisteredContactListComponent } from './unregistered-contact-list.component';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { PaginationModule } from '@ZoppyTech/pagination';

@NgModule({
    declarations: [UnregisteredContactListComponent],
    imports: [CommonModule, StaticLoadingModule, InputModule, ButtonModule, IconModule, SearchBarModule, PaginationModule],
    exports: [UnregisteredContactListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UnregisteredContactListModule {}
