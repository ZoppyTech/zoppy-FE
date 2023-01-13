import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CurrencyPipe } from './currency/currency.pipe';
import { SafeHtmlPipe } from './dom-sanitizer/safe-html.pipe';
import { NamePipe } from './name/name.pipe';
import { PhonePipe } from './phone/phone.pipe';

@NgModule({
    declarations: [SafeHtmlPipe, CurrencyPipe, PhonePipe, NamePipe],
    imports: [CommonModule],
    exports: [SafeHtmlPipe, CurrencyPipe, PhonePipe, NamePipe]
})
export class PipesModule {}
