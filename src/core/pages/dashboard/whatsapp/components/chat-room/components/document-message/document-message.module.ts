import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentMessageComponent } from './document-message.component';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    declarations: [DocumentMessageComponent],
    imports: [CommonModule, PipesModule, StaticLoadingModule, IconModule],
    exports: [DocumentMessageComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DocumentMessageModule {}
