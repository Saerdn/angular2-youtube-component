import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
    id = ''; // Id of the youtube video

    // This is the "real" player we got via iframe api
    // all methods (i.e. "playVideo" or "pauseVideo") are directly taken from the api
    private players: { [index: string]: string; } = {};

    constructor() {}

    // Set player as soon as it's ready/loaded
    onReady(player, id) {
        this.players[id] = player;
    }

    // Triggered when the state of the player changes (pause, stop, play, ...)
    onStateChange(state, id) {
        // Repeat video after it fully ended
        if (state.data === YT.PlayerState.ENDED) {
            this.playVideo(id);
        };
    }

    playVideo(id) {
        this.players[id].playVideo();
    }

    pauseVideo(id) {
        this.players[id].pauseVideo();
    }
}