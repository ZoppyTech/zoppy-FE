import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticLoadingComponent } from './static-loading.component';

@NgModule({
    imports: [CommonModule],
    declarations: [StaticLoadingComponent],
    exports: [StaticLoadingComponent]
})
export class StaticLoadingModule {}
