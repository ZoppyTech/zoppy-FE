import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncDataComponent } from './sync-data.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { DatepickerModule } from '@ZoppyTech/datepicker';
import { ComponentsModule } from 'src/shared/components/components.module';

const routes: Routes = [
    {
        path: '',
        component: SyncDataComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        VisualIdentityModule,
        IconModule,
        ButtonModule,
        CheckboxModule,
        DatepickerModule
    ],
    declarations: [SyncDataComponent],
    exports: [SyncDataComponent]
})
export class SyncDataModule {}
