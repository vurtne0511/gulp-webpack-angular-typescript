// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { Media } from './audio-player';

@NgModule({
    declarations: [AppComponent],
    bootstrap: [AppComponent],
    imports: [BrowserModule]
})
export class AppModule {

    private player: Media.Player;

    constructor() {
        this.player = new Media.Player(new Array<Media.SoundData>());
    }
}
