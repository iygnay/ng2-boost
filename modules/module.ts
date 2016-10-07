
import { NgModule } from '@angular/core';
import { AppRootComponent }   from './app_root';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    bootstrap: [AppRootComponent],
    imports: [
        BrowserModule
    ],
    exports: [],
    declarations: [AppRootComponent],
    providers: [],
})
export class Ng2UtilsAppModule { 
}