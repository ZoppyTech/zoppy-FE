import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthInterceptor } from './interceptors/http.interceptor';
import { PipesModule } from './pipes/pipes.module';
import { Storage } from './utils/storage';
import { UtilityModule } from './utils/utility.module';

@NgModule({
    imports: [CommonModule, PipesModule, BrowserModule, HttpClientModule, UtilityModule],
    exports: [CommonModule, PipesModule, BrowserModule, HttpClientModule, UtilityModule],
    providers: [Storage, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }]
})
export class SharedModule {}
