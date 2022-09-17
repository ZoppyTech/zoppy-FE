import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SafeHtmlPipe } from './dom-sanitizer/safe-html.pipe';

@NgModule({
    declarations: [SafeHtmlPipe],
    imports: [CommonModule],
    exports: [SafeHtmlPipe]
})
export class PipesModule {}
