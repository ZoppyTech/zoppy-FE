import { NgModule } from '@angular/core';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { PublicService } from './public/public.service';
import { SideMenuService } from './side-menu/side-menu.service';

@NgModule({
    providers: [PublicService, SideMenuService, BreadcrumbService]
})
export class ServiceModule {}
