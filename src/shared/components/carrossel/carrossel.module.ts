import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarrosselComponent } from './carrossel.component';

@NgModule({
    imports: [CommonModule],
    declarations: [CarrosselComponent],
    exports: [CarrosselComponent]
})
export class CarrosselModule {}
