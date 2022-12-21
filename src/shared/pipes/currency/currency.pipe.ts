import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtils } from 'src/shared/utils/format.util';

@Pipe({
    name: 'zoppyCurrency'
})
export class CurrencyPipe implements PipeTransform {
    public transform(value: string, args?: any): any {
        return FormatUtils.toCurrency(value ? parseFloat(value) : 0);
    }
}