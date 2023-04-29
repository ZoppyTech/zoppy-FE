import { NgModule } from '@angular/core';
import { BreadcrumbService } from './breadcrumb/breadcrumb.service';
import { BroadcastService } from './broadcast/broadcast.service';
import { DashboardService } from './dashboard/dashboard.service';
import { ExternalTokenService } from './external-token/external-token.service';
import { PublicService } from './public/public.service';
import { ReportService } from './reports/report.service';
import { SideMenuService } from './side-menu/side-menu.service';
import { UserService } from './user/user.service';
import { WcGiftbackService } from './wc-giftback/wc-giftback.service';
import { WcKeyService } from './wc-key/wc-key.service';
import { WcWebhookService } from './wc-webhook/wc-webhook.service';
import { WebSocketService } from './websocket/websocket.service';
import { WhatsappAccountManagerService } from './whatsapp-account-manager/whatsapp-account-manager.service';
import { WhatsappAccountPhoneNumberService } from './whatsapp-account-phone-number/whatsapp-account-phone-number.service';
import { WhatsappAccountService } from './whatsapp-account/whatsapp-account.service';
import { WhatsappContactService } from './whatsapp-contact/whatsapp-contact.service';
import { WhatsappMessageService } from './whatsapp-message/whatsapp-message.service';
import { WhatsappConversationService } from './whatsapp-conversation/whatsapp-conversation.service';

@NgModule({
    providers: [
        BroadcastService,
        WebSocketService,
        PublicService,
        SideMenuService,
        ReportService,
        BreadcrumbService,
        WcGiftbackService,
        WcKeyService,
        WcWebhookService,
        ExternalTokenService,
        UserService,
        DashboardService,
        WhatsappAccountService,
        WhatsappAccountManagerService,
        WhatsappAccountPhoneNumberService,
        WhatsappContactService,
        WhatsappMessageService,
        WhatsappConversationService
    ]
})
export class ServiceModule {}
