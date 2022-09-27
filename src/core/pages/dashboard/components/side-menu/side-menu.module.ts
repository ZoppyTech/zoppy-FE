import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, TooltipModule, IconModule, VisualIdentityModule, RouterModule],
    declarations: [SideMenuComponent],
    exports: [SideMenuComponent]
})
export class SideMenuModule {}
