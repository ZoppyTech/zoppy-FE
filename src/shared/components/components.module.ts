import { NgModule } from '@angular/core';
import { CarrosselModule } from './carrossel/carrossel.module';
import { ModalModule } from './modal/modal.module';
import { StaticLoadingModule } from './static-loading/static-loading.module';
import { ChatInputModule } from './chat-input/chat-input.module';
import { EmptyListModule } from './empty-list/empty-list.module';
import { EmptyChartModule } from './empty-chart/empty-chart.module';

@NgModule({
    imports: [CarrosselModule, StaticLoadingModule, ModalModule.forRoot(), ChatInputModule, EmptyListModule, EmptyChartModule],
    exports: [CarrosselModule, StaticLoadingModule, ModalModule, ChatInputModule, EmptyListModule, EmptyChartModule],
    declarations: []
})
export class ComponentsModule {}
