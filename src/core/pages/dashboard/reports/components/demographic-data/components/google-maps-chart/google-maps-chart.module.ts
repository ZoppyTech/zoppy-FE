import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { SearchBarModule } from '@ZoppyTech/search-bar';
import { GoogleMapsChartComponent } from './google-maps-chart.component';

@NgModule({
    declarations: [GoogleMapsChartComponent],
    imports: [CommonModule, GoogleMapsModule, SearchBarModule, ButtonModule, IconModule],
    exports: [GoogleMapsChartComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class GoogleMapsChartModule {}
