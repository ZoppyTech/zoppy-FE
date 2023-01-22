import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsComponents } from '../../nps-rating.component';

@Component({
    selector: 'product-rating',
    templateUrl: './product-rating.component.html',
    styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent {
    @Input() public percent: number = 50;
    @Input() public currentComponent: string = '';
    @Output() public currentComponentChange: EventEmitter<string> = new EventEmitter<string>();

    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }

    public nextCard(): void {
        this.currentComponent = NpsComponents.RecommendationComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }
}
