import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsRequest } from 'src/shared/models/requests/nps/nps.request';
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
    @Input() public declare npsRequest: NpsRequest;
    @Output() public npsRequestChange: EventEmitter<NpsRequest> = new EventEmitter<NpsRequest>();
    @Output() public submitNpsReview: EventEmitter<void> = new EventEmitter<void>();

    public rows: number = 5;
    public placeholder: string = 'Digite aqui...';
    public commentary: string = '';

    public constructor() {}

    public ngOnInit(): void {
        //console.log('init');
    }

    public saveAnswer(): void {
        this.npsRequest.commentary = this.commentary;
        this.npsRequestChange.emit(this.npsRequest);
    }

    public submit(): void {
        this.saveAnswer();
        this.submitNpsReview.emit();
    }
}
