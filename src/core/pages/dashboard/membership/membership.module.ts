import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MembershipComponent } from './membership.component';
import { IconModule } from '@ZoppyTech/icon';
import { Routes, RouterModule } from '@angular/router';
import { DropdownModule } from '@ZoppyTech/dropdown';

const routes: Routes = [
    {
        path: '',
        component: MembershipComponent
    }
];

@NgModule({
    imports: [CommonModule, IconModule, RouterModule.forChild(routes), DropdownModule],
    declarations: [MembershipComponent],
    exports: [MembershipComponent]
})
export class MembershipModule {}
