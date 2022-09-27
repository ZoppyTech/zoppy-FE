import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ToastModule } from '@ZoppyTech/toast';
import { TooltipModule } from '@ZoppyTech/tooltip';
import { ConfirmActionModule } from '@ZoppyTech/confirm-action';
import { ComponentsModule } from 'src/shared/components/components.module';

@NgModule({
    imports: [AppRoutingModule, SharedModule, ToastModule, TooltipModule, ConfirmActionModule, ComponentsModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
