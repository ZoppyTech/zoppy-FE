import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsComponents } from '../../nps-rating.component';

@Component({
    selector: 'support-rating',
    templateUrl: './support-rating.component.html',
    styleUrls: ['./support-rating.component.scss']
})
export class SupportRatingComponent {
    @Input() public percent: number = 25;
    @Input() public currentComponent: string = '';
    @Output() public currentComponentChange: EventEmitter<string> = new EventEmitter<string>();

    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }

    public nextCard(): void {
        this.currentComponent = NpsComponents.ProductComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }
}
