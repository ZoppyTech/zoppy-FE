import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency/currency.pipe';
import { SafeHtmlPipe } from './dom-sanitizer/safe-html.pipe';
import { PhonePipe } from './phone/phone.pipe';

@NgModule({
    declarations: [SafeHtmlPipe, CurrencyPipe, PhonePipe],
    imports: [CommonModule],
    exports: [SafeHtmlPipe, CurrencyPipe, PhonePipe]
})
export class PipesModule {}
