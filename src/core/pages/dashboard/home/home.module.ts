import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { IconModule } from '@ZoppyTech/icon';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, RouterModule.forChild(routes)],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule {}
