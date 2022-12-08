import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtils } from 'src/shared/utils/format.util';

@Pipe({
    name: 'zoppyPhone'
})
export class PhonePipe implements PipeTransform {
    public transform(value: string, args?: any): any {
        return FormatUtils.applyBrMaskToPhone(value);
    }
}
