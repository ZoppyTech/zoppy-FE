import { NgModule } from '@angular/core';
import { PublicService } from './public/public.service';
import { SideMenuService } from './side-menu/side-menu.service';

@NgModule({
    providers: [PublicService, SideMenuService]
})
export class ServiceModule {}
