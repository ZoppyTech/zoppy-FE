import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu.component';
import { TooltipModule } from '@lucarrloliveira/tooltip';
import { IconModule } from '@lucarrloliveira/icon';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [CommonModule, TooltipModule, IconModule, VisualIdentityModule, RouterModule],
    declarations: [SideMenuComponent],
    exports: [SideMenuComponent]
})
export class SideMenuModule {}
