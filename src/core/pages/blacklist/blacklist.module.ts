import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlacklistComponent } from './blacklist.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';

const routes: Routes = [
    {
        path: '',
        component: BlacklistComponent
    }
];

@NgModule({
    imports: [CommonModule, RouterModule.forChild(routes), IconModule, ButtonModule, InputModule, CarrosselModule],
    exports: [BlacklistComponent],
    declarations: [BlacklistComponent]
})
export class BlacklistModule {}
