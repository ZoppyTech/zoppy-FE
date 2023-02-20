import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'zoppyName'
})
export class NamePipe implements PipeTransform {
    public transform(value: string, args?: any): any {
        if (!value) return '';
        const names: string[] = value.split(' ');
        const response: string[] = [];

        for (const splitName of names) {
            if (!splitName[0]) continue;
            response.push(splitName[0].toUpperCase() + splitName.substring(1, splitName.length).toLowerCase());
        }

        return response.join(' ');
    }
}
