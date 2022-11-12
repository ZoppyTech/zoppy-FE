import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeChatComponent } from './welcome-chat.component';

@NgModule({
    declarations: [WelcomeChatComponent],
    imports: [CommonModule],
    exports: [WelcomeChatComponent]
})
export class WelcomeChatModule {}
