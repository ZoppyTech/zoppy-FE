import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsRequest } from 'src/shared/models/requests/nps/nps.request';
import { NpsComponents } from '../../nps-rating.component';

@Component({
    selector: 'recommendation-rating',
    templateUrl: './recommendation-rating.component.html',
    styleUrls: ['./recommendation-rating.component.scss']
})
export class RecommendationRatingComponent {
    @Input() public percent: number = 75;

    @Input() public currentComponent: string = '';
    @Output() public currentComponentChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() public declare npsRequest: NpsRequest;
    @Output() public npsRequestChange: EventEmitter<NpsRequest> = new EventEmitter<NpsRequest>();

    public lockedButton: boolean = true;

    public answerOptions: Array<{ label: string; value: number }> = [
        { label: '1', value: 1 },
        { label: '2', value: 2 },
        { label: '3', value: 3 },
        { label: '4', value: 4 },
        { label: '5', value: 5 },
        { label: '6', value: 6 },
        { label: '7', value: 7 },
        { label: '8', value: 8 },
        { label: '9', value: 9 },
        { label: '10', value: 10 }
    ];

    public constructor() {}

    public ngOnInit(): void {
        console.log('init');
    }

    public optionSelected(option: number): void {
        debugger;
        this.npsRequest.recommendationGrade = option;
        this.npsRequestChange.emit(this.npsRequest);
        this.lockedButton = false;
    }

    public nextCard(): void {
        this.currentComponent = NpsComponents.CommentaryOrSuggestionComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }
}
