import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { IconModule } from '@lucarrloliveira/icon';
import { MiniMenuModule } from '@lucarrloliveira/mini-menu';
import { ContactModule } from '@lucarrloliveira/contact';

@NgModule({
    imports: [CommonModule, IconModule, VisualIdentityModule, MiniMenuModule, ContactModule],
    declarations: [TopBarComponent],
    exports: [TopBarComponent]
})
export class TopBarModule {}
