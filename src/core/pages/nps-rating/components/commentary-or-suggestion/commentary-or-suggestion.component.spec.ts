import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentaryOrSuggestionComponent } from './commentary-or-suggestion.component';

describe('CommentaryOrSuggestionComponent', () => {
    let component: CommentaryOrSuggestionComponent;
    let fixture: ComponentFixture<CommentaryOrSuggestionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CommentaryOrSuggestionComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(CommentaryOrSuggestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
