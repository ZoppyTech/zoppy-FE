import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
    public constructor(private sanitizer: DomSanitizer) {
        //no content
    }

    public transform(style: any): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(style);
    }
}
