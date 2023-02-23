import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageMessageComponent } from './image-message.component';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';

@NgModule({
    declarations: [ImageMessageComponent],
    imports: [CommonModule, PipesModule, StaticLoadingModule],
    exports: [ImageMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ImageMessageModule {}
