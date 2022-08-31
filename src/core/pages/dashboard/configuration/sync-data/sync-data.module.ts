import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncDataComponent } from './sync-data.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@lucarrloliveira/button';
import { IconModule } from '@lucarrloliveira/icon';
import { VisualIdentityModule } from '@lucarrloliveira/visual-identity';
import { CheckboxModule } from '@lucarrloliveira/checkbox';
import { DatepickerModule } from '@lucarrloliveira/datepicker';

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
