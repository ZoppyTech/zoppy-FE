import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioMessageComponent } from './audio-message.component';
import { PipesModule } from 'src/shared/pipes/pipes.module';

@NgModule({
    declarations: [AudioMessageComponent],
    imports: [CommonModule, PipesModule],
    exports: [AudioMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AudioMessageModule {}
