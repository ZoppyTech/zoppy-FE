import { NgModule } from '@angular/core';
import { CarrosselModule } from './carrossel/carrossel.module';

@NgModule({
    imports: [CarrosselModule],
    exports: [CarrosselModule]
})
export class ComponentsModule {}
