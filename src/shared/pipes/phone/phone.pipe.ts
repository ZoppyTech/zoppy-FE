import { Pipe, PipeTransform } from '@angular/core';
import { FormatUtils } from '@ZoppyTech/utilities';

@Pipe({
    name: 'zoppyPhone'
})
export class PhonePipe implements PipeTransform {
    public transform(value: string, args?: any): any {
        return FormatUtils.applyBrMaskToPhone(value);
    }
}
