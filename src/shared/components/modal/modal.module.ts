import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { InfoModule } from './info/info.module';

@NgModule({
    imports: [CommonModule, InfoModule],
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
