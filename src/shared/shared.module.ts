import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'src/environments/environment';
import { AuthInterceptor } from './interceptors/http.interceptor';
import { PipesModule } from './pipes/pipes.module';
import { Storage } from './utils/storage';
import { UtilityModule } from './utils/utility.module';

const config: SocketIoConfig = { url: environment.apiUrl, options: {} };

@NgModule({
    imports: [CommonModule, PipesModule, BrowserModule, HttpClientModule, UtilityModule, SocketIoModule.forRoot(config)],
    exports: [CommonModule, PipesModule, BrowserModule, HttpClientModule, UtilityModule],
    providers: [Storage, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class SharedModule {}
