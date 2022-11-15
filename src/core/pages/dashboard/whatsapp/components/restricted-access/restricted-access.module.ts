import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestrictedAccessComponent } from './restricted-access.component';
import { StaticLoadingModule } from 'src/shared/components/static-loading/static-loading.module';
import { IconModule } from '@ZoppyTech/icon';
import { ButtonModule } from '@ZoppyTech/button';
import { InputModule } from '@ZoppyTech/input';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { UpgradePendingCardModule } from './components/upgrade-pending-card/upgrade-pending-card.module';
import { IntegrationErrorCardModule } from './components/integration-error-card/integration-error-card.module';
import { ActivationPendingCardModule } from './components/activation-pending-card/activation-pending-card.module';

@NgModule({
    declarations: [RestrictedAccessComponent],
    imports: [
        CommonModule,
        UpgradePendingCardModule,
        IntegrationErrorCardModule,
        ActivationPendingCardModule,
        StaticLoadingModule,
        VisualIdentityModule,
        IconModule,
        ButtonModule,
        InputModule
    ],
    exports: [RestrictedAccessComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class RestrictedAccessModule {}
