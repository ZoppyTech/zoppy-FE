import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemographicDataComponent } from './demographic-data.component';
import { ShoppingFrequencyChartModule } from './components/shopping-frequency-chart/shopping-frequency-chart.module';
import { SalesByStateChartModule } from './components/sales-by-state-chart/sales-by-state-chart.module';
import { SalesByGenderChartModule } from './components/sales-by-gender-chart/sales-by-gender-chart.module';
import { GoogleMapsChartModule } from './components/google-maps-chart/google-maps-chart.module';
import { BuyerAgeChartModule } from './components/buyer-age-chart/buyer-age-chart.module';

@NgModule({
    imports: [
        CommonModule,
        ShoppingFrequencyChartModule,
        SalesByStateChartModule,
        SalesByGenderChartModule,
        GoogleMapsChartModule,
        BuyerAgeChartModule
    ],
    declarations: [DemographicDataComponent],
    exports: [DemographicDataComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class DemographicDataModule {}
