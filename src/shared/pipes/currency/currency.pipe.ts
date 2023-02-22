import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtils } from '@ZoppyTech/utilities';

@Pipe({
    name: 'zoppyCurrency'
})
export class CurrencyPipe implements PipeTransform {
    public transform(value: string | number, args?: any): any {
        return FormatUtils.toCurrency(value ? parseFloat(value.toString()) : 0);
    }
}
