import { NgModule } from '@angular/core';
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

const routes: Routes = [
    {
        path: '',
        component: CustomerSocialMediaComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        IconModule,
        RouterModule.forChild(routes),
        DropdownModule,
        InputModule,
        ContactModule,
        ButtonModule,
        RadioButtonModule,
        DatepickerModule,
        PipesModule
    ],
    declarations: [CustomerSocialMediaComponent],
    exports: [CustomerSocialMediaComponent]
})
export class CustomerSocialMediaModule {}
