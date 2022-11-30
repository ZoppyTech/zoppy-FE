import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RfmOverviewComponent } from './rfm-overview.component';
import { SalesByStateModule } from '../../../sales-by-state/sales-by-state.module';
import { SalesByGenderModule } from '../../../sales-by-gender/sales-by-gender.module';
import { StateChartModule } from './components/state-chart/state-chart.module';
import { GenderChartModule } from './components/gender-chart/gender-chart.module';

@NgModule({
    imports: [CommonModule, StateChartModule, GenderChartModule],
    declarations: [RfmOverviewComponent],
    exports: [RfmOverviewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RfmOverviewModule {}
