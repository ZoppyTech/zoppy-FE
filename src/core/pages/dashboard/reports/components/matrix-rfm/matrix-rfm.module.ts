import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixRfmComponent } from './matrix-rfm.component';
import { ButtonModule } from '@ZoppyTech/button';
import { RfmOverviewModule } from './components/rfm-overview/rfm-overview.module';
import { IconModule } from '@ZoppyTech/icon';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';

@NgModule({
    imports: [CommonModule, ButtonModule, RfmOverviewModule, IconModule, PipesModule, StaticLoadingModule],
    declarations: [MatrixRfmComponent],
    exports: [MatrixRfmComponent]
})
export class MatrixRfmModule {}
