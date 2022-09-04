import { NgModule } from '@angular/core';
import { CarrosselModule } from './carrossel/carrossel.module';
import { ModalModule } from './modal/modal.module';

@NgModule({
    imports: [CarrosselModule, ModalModule.forRoot()],
    exports: [CarrosselModule, ModalModule]
})
export class ComponentsModule {}
