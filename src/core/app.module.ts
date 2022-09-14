import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { ToastModule } from '@lucarrloliveira/toast';
import { TooltipModule } from '@lucarrloliveira/tooltip';
import { ConfirmActionModule } from '@lucarrloliveira/confirm-action';
import { ComponentsModule } from 'src/shared/components/components.module';
import { environment } from 'src/environments/environment';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';

const config: SocketIoConfig = {
    url: environment.apiUrl, // socket server url;
    options: {
        transports: ['websocket']
    }
};

@NgModule({
    imports: [
        AppRoutingModule,
        ComponentsModule,
        ConfirmActionModule,
        SharedModule,
        SocketIoModule.forRoot(config),
        ToastModule,
        TooltipModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule {}
