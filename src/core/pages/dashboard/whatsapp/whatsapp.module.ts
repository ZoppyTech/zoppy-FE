import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsappComponent } from './whatsapp.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatListModule } from './components/chat-list/chat-list.module';

const routes: Routes = [
    {
        path: '',
        component: WhatsappComponent
    }
];

@NgModule({
    declarations: [WhatsappComponent],
    imports: [CommonModule, RouterModule.forChild(routes), ChatListModule],
    exports: [WhatsappComponent]
})
export class WhatsappModule {}
