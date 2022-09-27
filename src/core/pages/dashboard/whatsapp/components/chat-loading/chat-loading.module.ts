import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatLoadingComponent } from './chat-loading.component';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    declarations: [ChatLoadingComponent],
    imports: [CommonModule, StaticLoadingModule, IconModule],
    exports: [ChatLoadingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChatLoadingModule {}
