import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { Routes, RouterModule } from '@angular/router';
import { ButtonModule } from '@ZoppyTech/button';
import { IconModule } from '@ZoppyTech/icon';
import { InputModule } from '@ZoppyTech/input';
import { CarrosselModule } from 'src/shared/components/carrossel/carrossel.module';
import { CheckboxModule } from '@ZoppyTech/checkbox';
import { RadioButtonModule } from '@ZoppyTech/radio-button';
import { PipesModule } from 'src/shared/pipes/pipes.module';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { DropdownModule } from '@ZoppyTech/dropdown';
import { StepperModule } from '@ZoppyTech/stepper';
import { SelectorModule } from '@ZoppyTech/selector';

const routes: Routes = [
    {
        path: '',
        component: RegisterComponent
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
    declarations: [RegisterComponent]
})
export class RegisterModule {}
