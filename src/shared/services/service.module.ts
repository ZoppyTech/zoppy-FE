import { NgModule } from '@angular/core';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { ExternalTokenService } from './external-token/external-token.service';
import { PublicService } from './public/public.service';
import { SideMenuService } from './side-menu/side-menu.service';
import { WcGiftbackService } from './wc-giftback/wc-giftback.service';
import { WcKeyService } from './wc-key/wc-key.service';
import { WcSyncService } from './wc-sync/wc-sync.service';

@NgModule({
    providers: [PublicService, SideMenuService, BreadcrumbService, WcGiftbackService, WcKeyService, WcSyncService, ExternalTokenService]
})
export class ServiceModule {}
