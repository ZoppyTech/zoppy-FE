import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { TextMessageComponent } from './text-message.component';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    declarations: [TextMessageComponent],
    imports: [CommonModule, PipesModule, IconModule],
    exports: [TextMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class TextMessageModule {}
