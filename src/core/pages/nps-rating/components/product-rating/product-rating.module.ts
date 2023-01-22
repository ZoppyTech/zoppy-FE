import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductRatingComponent } from './product-rating.component';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { NgxStarRatingModule } from 'ngx-star-rating';

@NgModule({
    declarations: [ProductRatingComponent],
    imports: [CommonModule, VisualIdentityModule, NgxStarRatingModule, IconModule, ButtonModule, InputModule],
    exports: [ProductRatingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class ProductRatingModule {}
