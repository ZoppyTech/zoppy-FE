import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMessageComponent } from './image-message.component';
import { PipesModule } from 'src/shared/pipes/pipes.module';

@NgModule({
    declarations: [ImageMessageComponent],
    imports: [CommonModule, PipesModule],
    exports: [ImageMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ImageMessageModule {}
