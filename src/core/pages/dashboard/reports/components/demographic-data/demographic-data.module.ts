import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemographicDataComponent } from './demographic-data.component';

@NgModule({
    imports: [CommonModule],
    declarations: [DemographicDataComponent],
    exports: [DemographicDataComponent]
})
export class DemographicDataModule {}
