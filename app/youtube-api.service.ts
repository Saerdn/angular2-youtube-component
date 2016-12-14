/**
 * Service to provide the Youtube API
 */

import {Injectable, EventEmitter} from '@angular/core';

@Injectable()
export class YoutubeApiService {
    private apiIsLoaded: boolean = false;
    public apiEmitter: EventEmitter = new EventEmitter<any>();

    constructor() { }

    /**
     * Load the Youtube iframe API into the DOM to get access.
     * Stream the YT object to inform all listeners when it's ready.
     */
    loadApi() {
        // Load API only once
        if( this.apiIsLoaded == false ) {
            // Load api
            let apiScriptTag = window.document.createElement("script");
            apiScriptTag.type = "text/javascript";
            apiScriptTag.src = "https://www.youtube.com/iframe_api";
            window.document.body.appendChild(apiScriptTag);

            // Stream the YT code (which contains the js youtube framework)
            // Notice: window.YT.Player needs to be initialized WITHIN the scope of onYouTubeIframeAPIReady
            window['onYouTubeIframeAPIReady'] = () => {
                // Emit the youtube player Object so it can be used by all subscribing players
                this.apiEmitter.emit(window.YT);
            };
        } else {
            this.apiIsLoaded = true;
        }
    }
}
