import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { CountdownTimerComponent } from './countdown-timer.component';

@NgModule({
    declarations: [CountdownTimerComponent],
    imports: [CommonModule, VisualIdentityModule],
    exports: [CountdownTimerComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CountdownTimerModule {}
