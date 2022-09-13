import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';
import { InputModule } from '@lucarrloliveira/input';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
@NgModule({
    declarations: [ContactListComponent],
    imports: [CommonModule, InputModule, ButtonModule, IconModule],
    exports: [ContactListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ContactListModule {}
