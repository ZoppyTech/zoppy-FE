import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpgradePendingCardComponent } from './upgrade-pending-card.component';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';

@NgModule({
    declarations: [UpgradePendingCardComponent],
    imports: [CommonModule, StaticLoadingModule, VisualIdentityModule, IconModule, ButtonModule, InputModule],
    exports: [UpgradePendingCardComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class UpgradePendingCardModule {}
