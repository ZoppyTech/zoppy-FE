import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UtilityModule } from './utils/utility.module';
import { Storage } from './utils/storage';
import { AuthInterceptor } from './interceptors/http.interceptor';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
    imports: [CommonModule, BrowserModule, HttpClientModule, UtilityModule, SocketIoModule.forRoot(config)],
    exports: [CommonModule, BrowserModule, HttpClientModule, UtilityModule],
    providers: [Storage, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class SharedModule {}