import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpsRatingComponent } from './nps-rating.component';
import { RouterModule, Routes } from '@angular/router';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { ButtonModule } from '@ZoppyTech/button';
import { PageNotFoundModule } from './components/page-not-found/page-not-found.module';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { SupportRatingModule } from './components/support-rating/support-rating.module';

const routes: Routes = [
    {
        path: '',
        component: NpsRatingComponent
    }
];

@NgModule({
    exports: [NpsRatingComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VisualIdentityModule,
        PageNotFoundModule,
        SupportRatingModule,
        IconModule,
        InputModule,
        ButtonModule
    ],
    declarations: [NpsRatingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class NpsRatingModule {}
