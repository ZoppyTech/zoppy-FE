import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
    public readonly PAGE_NOT_FOUND_IMAGE_DIR: string = './../../../../../assets/imgs/unavailable_service.png';
    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }
}
