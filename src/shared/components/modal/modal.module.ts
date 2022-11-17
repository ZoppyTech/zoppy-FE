import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { InfoModule } from './info/info.module';
import { ChatContactModule } from './chat-contact/chat-contact.module';
import { InputInfoModule } from './input-info/input-info.module';

@NgModule({
    imports: [CommonModule, InfoModule, ChatContactModule, InputInfoModule],
    declarations: [ModalComponent],
    exports: [ModalComponent],
    providers: [ModalService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    }
}
