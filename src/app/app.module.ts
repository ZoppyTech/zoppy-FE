import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

console.log(environment.apiUrl);
const config: SocketIoConfig = { url: environment.apiUrl, options: {} };
debugger;

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, SocketIoModule.forRoot(config)],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
