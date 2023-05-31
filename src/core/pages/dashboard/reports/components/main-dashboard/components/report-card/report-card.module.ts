import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCardComponent } from './report-card.component';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { EmptyChartModule } from 'src/shared/components/empty-chart/empty-chart.module';

@NgModule({
    imports: [CommonModule, TooltipModule, EmptyChartModule],
    declarations: [ReportCardComponent],
    exports: [ReportCardComponent]
})
export class ReportCardModule {}
