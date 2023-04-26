import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatListComponent } from './chat-list.component';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { ContactModule } from '@ZoppyTech/contact';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';

@NgModule({
    declarations: [ChatListComponent],
    imports: [CommonModule, InputModule, ButtonModule, IconModule, ContactModule, StaticLoadingModule, ContactModule],
    exports: [ChatListComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatListModule {}
