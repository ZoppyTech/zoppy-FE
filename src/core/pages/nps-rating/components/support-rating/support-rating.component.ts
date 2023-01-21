import { Component, Input } from '@angular/core';

@Component({
    selector: 'support-rating',
    templateUrl: './support-rating.component.html',
    styleUrls: ['./support-rating.component.scss']
})
export class SupportRatingComponent {
    @Input() public percent: number = 50;
    public readonly UNEXPECTED_ERROR_LOADING_CHAT_IMAGE_DIR: string = './../../../../../assets/imgs/unavailable_service.png';

    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }

    public nextCard(): void {}
}
