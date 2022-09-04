import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './modal.component';
import { ModalService } from './modal.service';
import { InfoModule } from './info/info.module';

@NgModule({
    imports: [CommonModule, InfoModule],
    declarations: [ModalComponent],
    exports: [ModalComponent],
    providers: [ModalService]
})
export class ModalModule {
    public static forRoot(): ModuleWithProviders<ModalModule> {
        return {
            ngModule: ModalModule,
            providers: [ModalService]
        };
    }
}
