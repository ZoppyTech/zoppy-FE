import { NgModule } from '@angular/core';
import { CarrosselModule } from './carrossel/carrossel.module';
import { ModalModule } from './modal/modal.module';
import { StaticLoadingModule } from './static-loading/static-loading.module';

@NgModule({
    imports: [CarrosselModule, StaticLoadingModule, ModalModule.forRoot()],
    exports: [CarrosselModule, StaticLoadingModule, ModalModule]
})
export class ComponentsModule {}
