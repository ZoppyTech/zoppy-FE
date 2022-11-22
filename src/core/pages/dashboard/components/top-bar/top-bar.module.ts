import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopBarComponent } from './top-bar.component';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { MiniMenuModule } from '@ZoppyTech/mini-menu';
import { ContactModule } from '@ZoppyTech/contact';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, IconModule, VisualIdentityModule, MiniMenuModule, ContactModule, RouterModule],
    declarations: [TopBarComponent],
    exports: [TopBarComponent]
})
export class TopBarModule {}
