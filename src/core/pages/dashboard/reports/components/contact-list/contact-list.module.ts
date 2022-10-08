import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactListComponent } from './contact-list.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ContactListComponent],
    exports: [ContactListComponent]
})
export class ContactListModule {}
