import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NpsComponent } from './nps.component';
import { AverageNpsChartModule } from './components/average-nps-chart/average-nps-chart.module';
import { ServiceLevelChartModule } from './components/service-level-chart/service-level-chart.module';
import { ProductLevelChartModule } from './components/product-level-chart/product-level-chart.module';

@NgModule({
    imports: [CommonModule, AverageNpsChartModule, ServiceLevelChartModule, ProductLevelChartModule],
    declarations: [NpsComponent],
    exports: [NpsComponent]
})
export class NpsModule {}
