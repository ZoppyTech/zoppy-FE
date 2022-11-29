import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpsComponent } from './nps.component';

@NgModule({
    imports: [CommonModule],
    declarations: [NpsComponent],
    exports: [NpsComponent]
})
export class NpsModule {}
