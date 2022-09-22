import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadMessageComponent } from './thread-message.component';
import { IconModule } from '@lucarrloliveira/icon';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';

@NgModule({
    declarations: [ThreadMessageComponent],
    imports: [CommonModule, IconModule, StaticLoadingModule],
    exports: [ThreadMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ThreadMessageModule {}
