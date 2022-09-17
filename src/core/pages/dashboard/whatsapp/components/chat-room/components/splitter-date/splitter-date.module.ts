import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplitterDateComponent } from './splitter-date.component';

@NgModule({
    declarations: [SplitterDateComponent],
    imports: [CommonModule],
    exports: [SplitterDateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class SplitterDateModule {}
