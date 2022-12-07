import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixRfmComponent } from './matrix-rfm.component';
import { ButtonModule } from '@ZoppyTech/button';
import { RfmOverviewModule } from './components/rfm-overview/rfm-overview.module';
import { IconModule } from '@ZoppyTech/icon';

@NgModule({
    imports: [CommonModule, ButtonModule, RfmOverviewModule, IconModule],
    declarations: [MatrixRfmComponent],
    exports: [MatrixRfmComponent]
})
export class MatrixRfmModule {}
