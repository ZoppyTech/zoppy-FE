import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlockedComponent } from './blocked.component';
import { ButtonModule } from '@ZoppyTech/button';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { SelectorModule } from '@ZoppyTech/selector';
import { StepperModule } from '@ZoppyTech/stepper';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { Routes, RouterModule } from '@angular/router';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';
import { PipesModule } from 'src/shared/pipes/pipes.module';

const routes: Routes = [
    {
        path: '',
        component: BlockedComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        IconModule,
        InputModule,
        ButtonModule,
        CarrosselModule,
        CheckboxModule,
        RadioButtonModule,
        PipesModule,
        TooltipModule,
        DropdownModule,
        StepperModule,
        SelectorModule
    ],
    declarations: [BlockedComponent]
})
export class BlockedModule {}
