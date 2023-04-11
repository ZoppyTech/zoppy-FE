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

    public answerOptions: Array<{ label: string; value: number; active: boolean }> = [
        { label: '1', value: 1, active: false },
        { label: '2', value: 2, active: false },
        { label: '3', value: 3, active: false },
        { label: '4', value: 4, active: false },
        { label: '5', value: 5, active: false },
        { label: '6', value: 6, active: false },
        { label: '7', value: 7, active: false },
        { label: '8', value: 8, active: false },
        { label: '9', value: 9, active: false },
        { label: '10', value: 10, active: false }
    ];

    public constructor() {}

    public ngOnInit(): void {
        //console.log('init');
    }

    public saveAnswer(recommendationGrade: number): void {
        this.npsRequest.recommendationGrade = recommendationGrade;
        this.npsRequestChange.emit(this.npsRequest);
    }

    public optionSelected(option: { label: string; value: number; active: boolean }): void {
        this.disableAllAnswerOptions();
        option.active = true;
        this.saveAnswer(option.value);
        this.lockedButton = false;
    }

    public nextCard(): void {
        this.currentComponent = NpsComponents.CommentaryOrSuggestionComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }

    public disableAllAnswerOptions(): void {
        this.answerOptions.forEach((option: { label: string; value: number; active: boolean }) => {
            option.active = false;
        });
    }
}
