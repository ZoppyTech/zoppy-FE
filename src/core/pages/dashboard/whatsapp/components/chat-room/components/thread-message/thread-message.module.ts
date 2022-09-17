import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThreadMessageComponent } from './thread-message.component';

@NgModule({
    declarations: [ThreadMessageComponent],
    imports: [CommonModule],
    exports: [ThreadMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ThreadMessageModule {}
