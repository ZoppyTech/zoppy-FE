import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ToastModule } from '@lucarrloliveira/toast';
import { TooltipModule } from '@lucarrloliveira/tooltip';
import { ConfirmActionModule } from '@lucarrloliveira/confirm-action';

@NgModule({
    imports: [AppRoutingModule, SharedModule, ToastModule, TooltipModule, ConfirmActionModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
