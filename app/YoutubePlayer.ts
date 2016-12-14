/**
 * Class representing the Youtube player.
 */

import { NgZone, Injectable } from "@angular/core";
import { YoutubeApiService } from "./youtube-api.service";
import { PlayerConfig } from "./playerconfig.interface";

@Injectable()
export class YoutubePlayer {
    private defaultWidth: number = 320;
    private defaultHeight: number = 240;

    constructor( private zone: NgZone, private youtubeApi: YoutubeApiService ) {}

    /**
     * (Wrapper function to) Load a new player using the youtube JS api
     */
    load( playerConfig: PlayerConfig ) {
        // Subscribe to the emitter who emits the window.YT OBJECT AS SOON AS IT IS LOADED/AVAILABLE.
        // "data => window.YT" => We actually don't need to use it here, just make sure the function is called AFTER
        // the OBJECT is available
        this.youtubeApi.apiEmitter.subscribe(
            data => {
                // Using this.zone.run() causes Angular to perform change detection which will update the view
                this.zone.run(() => this.newPlayer( playerConfig ) );
            }
        );
    }

    /**
     * For cleaner code: load new YT player within that private function.
     * See https://developers.google.com/youtube/iframe_api_reference for documentation
     */
    private newPlayer(playerConfig: PlayerConfig) {

        new window.YT.Player(playerConfig.elementId, {
            width: playerConfig.width || this.defaultWidth,
            height: playerConfig.height || this.defaultHeight,
            videoId: playerConfig.videoId,
            events: {
                onReady: (event: YT.EventArgs) => {
                    // ev.target = the "real" player of the Youtbe API
                    playerConfig.outputs.ready.emit(event.target);
                },
                onStateChange: (event: YT.EventArgs) => {
                    playerConfig.outputs.change.emit(event);
                }
            }
        });

    }

    /**
     * Generate a unique ID.
     * It's needed when working with multiple players.
     * Source: http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript/8809472#8809472
     *
     * @return {string}
     */
    generateUUID () {
        var d = new Date().getTime();
        if(window.performance && typeof window.performance.now === "function"){
            d += performance.now(); //use high-precision timer if available
        }
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random()*16)%16 | 0;
            d = Math.floor(d/16);
            return (c=='x' ? r : (r&0x3|0x8)).toString(16);
        });

        return uuid;
    }
}