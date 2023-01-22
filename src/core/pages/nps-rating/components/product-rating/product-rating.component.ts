import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NpsComponents } from '../../nps-rating.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NpsRequest } from 'src/shared/models/requests/nps/nps.request';

@Component({
    selector: 'product-rating',
    templateUrl: './product-rating.component.html',
    styleUrls: ['./product-rating.component.scss']
})
export class ProductRatingComponent {
    @Input() public percent: number = 50;
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

    public saveAnswer(productGrade: number): void {
        this.npsRequest.productGrade = productGrade;
        this.npsRequestChange.emit(this.npsRequest);
    }

    public nextCard(): void {
        this.saveAnswer(this.form.value.rating);
        this.currentComponent = NpsComponents.RecommendationComponent;
        this.currentComponentChange.emit(this.currentComponent);
    }
}
