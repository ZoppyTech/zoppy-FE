import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfoComponent } from './info.component';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';

@NgModule({
    imports: [CommonModule, ButtonModule, IconModule, VisualIdentityModule],
    declarations: [InfoComponent],
    exports: [InfoComponent]
})
export class InfoModule {}
