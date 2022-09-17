import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleInfoComponent } from './bubble-info.component';

@NgModule({
    declarations: [BubbleInfoComponent],
    imports: [CommonModule],
    exports: [BubbleInfoComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class BubbleInfoModule {}
