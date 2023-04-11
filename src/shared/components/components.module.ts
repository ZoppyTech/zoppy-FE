import { NgModule } from '@angular/core';
import { CarrosselModule } from './carrossel/carrossel.module';
import { ModalModule } from './modal/modal.module';
import { StaticLoadingModule } from './static-loading/static-loading.module';
import { ChatInputModule } from './chat-input/chat-input.module';

@NgModule({
    imports: [CarrosselModule, StaticLoadingModule, ModalModule.forRoot(), ChatInputModule],
    exports: [CarrosselModule, StaticLoadingModule, ModalModule, ChatInputModule]
})
export class ComponentsModule {}
