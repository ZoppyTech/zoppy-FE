import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportCardComponent } from './report-card.component';
import { TooltipModule } from '@ZoppyTech/tooltip';

@NgModule({
    imports: [CommonModule, TooltipModule],
    declarations: [ReportCardComponent],
    exports: [ReportCardComponent]
})
export class ReportCardModule {}
