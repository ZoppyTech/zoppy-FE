import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsRequest } from 'src/shared/models/requests/nps/nps.request';
import { NpsComponents } from '../../nps-rating.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'support-rating',
    templateUrl: './support-rating.component.html',
    styleUrls: ['./support-rating.component.scss']
})
export class SupportRatingComponent {
    @Input() public percent: number = 25;
    @Input() public currentComponent: string = '';
    @Output() public currentComponentChange: EventEmitter<string> = new EventEmitter<string>();

    @Input() public declare npsRequest: NpsRequest;
    @Output() public npsRequestChange: EventEmitter<NpsRequest> = new EventEmitter<NpsRequest>();

    public declare form: FormGroup;

    public constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            rating: ['', Validators.required]
        });
    }

    public ngOnInit(): void {
        console.log('init');
    }

    public saveAnswer(supportGrade: number): void {
        this.npsRequest.supportGrade = supportGrade;
        this.npsRequestChange.emit(this.npsRequest);
    }

    public nextCard(): void {
        this.saveAnswer(this.form.value.rating);
        this.currentComponent = NpsComponents.ProductComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }
}
