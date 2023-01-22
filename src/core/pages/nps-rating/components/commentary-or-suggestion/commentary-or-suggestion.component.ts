import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsComponents } from '../../nps-rating.component';

@Component({
    selector: 'commentary-or-suggestion',
    templateUrl: './commentary-or-suggestion.component.html',
    styleUrls: ['./commentary-or-suggestion.component.scss']
})
export class CommentaryOrSuggestionComponent {
    @Input() public percent: number = 100;
    @Input() public currentComponent: string = '';
    @Output() public currentComponentChange: EventEmitter<string> = new EventEmitter<string>();

    public rows: number = 5;
    public placeholder: string = 'Digite aqui...';
    public commentary: string = '';

    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }

    public send(): void {
        this.currentComponent = NpsComponents.CongratulationsComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }
}
