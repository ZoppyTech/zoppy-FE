import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationComponent } from './configuration.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        component: ConfigurationComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes)],
    declarations: [ConfigurationComponent],
    exports: [ConfigurationComponent]
})
export class ConfigurationModule {}
