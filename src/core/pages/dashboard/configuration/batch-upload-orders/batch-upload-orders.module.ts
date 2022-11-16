import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BatchUploadOrdersComponent } from './batch-upload-orders.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { SwitchModule } from '@ZoppyTech/switch';
import { VisualIdentityModule } from '@ZoppyTech/visual-identity';

const routes: Routes = [
    {
        path: '',
        component: BatchUploadOrdersComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), VisualIdentityModule, IconModule, ButtonModule, SwitchModule, InputModule],

    declarations: [BatchUploadOrdersComponent],
    exports: [BatchUploadOrdersComponent]
})
export class BatchUploadOrdersModule {}
