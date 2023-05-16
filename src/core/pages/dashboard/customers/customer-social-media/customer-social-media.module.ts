import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerSocialMediaComponent } from './customer-social-media.component';
import { IconModule } from '@ZoppyTech/icon';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { InputModule } from '@ZoppyTech/input';
import { ContactModule } from '@ZoppyTech/contact';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { GiftbackAlertBoxModule } from 'src/shared/components/giftback-alert-box/giftback-alert-box.module';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TooltipModule } from '@ZoppyTech/tooltip';

const routes: Routes = [
    {
        path: '',
        component: CustomerSocialMediaComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        NgxStarRatingModule,
        FormsModule,
        ReactiveFormsModule,
        IconModule,
        RouterModule.forChild(routes),
        DropdownModule,
        InputModule,
        ContactModule,
        ButtonModule,
        RadioButtonModule,
        DatepickerModule,
        PipesModule,
        GiftbackAlertBoxModule,
        TooltipModule
    ],
    declarations: [CustomerSocialMediaComponent],
    exports: [CustomerSocialMediaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CustomerSocialMediaModule {}
