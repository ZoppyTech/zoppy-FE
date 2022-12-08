import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpsComponent } from './nps.component';
import { AverageNpsChartModule } from './components/average-nps-chart/average-nps-chart.module';
import { ServiceLevelChartModule } from './components/service-level-chart/service-level-chart.module';
import { ProductLevelChartModule } from './components/product-level-chart/product-level-chart.module';
import { AbcCurveChartModule } from './components/abc-curve-chart/abc-curve-chart.module';
import { ConsumerNpsChartModule } from './components/consumer-nps-chart/consumer-nps-chart.module';

@NgModule({
    imports: [
        CommonModule,
        AverageNpsChartModule,
        ServiceLevelChartModule,
        ProductLevelChartModule,
        AbcCurveChartModule,
        ConsumerNpsChartModule
    ],
    declarations: [NpsComponent],
    exports: [NpsComponent]
})
export class NpsModule {}
