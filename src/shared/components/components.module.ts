import { NgModule } from '@angular/core';
import { CarrosselModule } from './carrossel/carrossel.module';
import { ModalModule } from './modal/modal.module';
import { StaticLoadingModule } from './static-loading/static-loading.module';
import { ChatInputModule } from './chat-input/chat-input.module';
import { EmptyListModule } from './empty-list/empty-list.module';

@NgModule({
    imports: [CarrosselModule, StaticLoadingModule, ModalModule.forRoot(), ChatInputModule, EmptyListModule],
    exports: [CarrosselModule, StaticLoadingModule, ModalModule, ChatInputModule, EmptyListModule],
    declarations: []
})
export class ComponentsModule {}
