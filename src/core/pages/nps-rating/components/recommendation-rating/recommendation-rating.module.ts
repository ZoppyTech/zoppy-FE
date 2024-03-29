import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationRatingComponent } from './recommendation-rating.component';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';

@NgModule({
    declarations: [RecommendationRatingComponent],
    imports: [CommonModule, VisualIdentityModule, IconModule, ButtonModule, InputModule],
    exports: [RecommendationRatingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RecommendationRatingModule {}
