# Angular2 Youtube Component
Youtube iframe API integration. Use this Angular 2 component if you 
want to integrate and control Youtube videos.

Usage:
```
<youtube-player
        [videoId]="id"
        (ready)="onReady($event, id)"
        (change)="onStateChange($event, id)"
>
</youtube-player>
<br />
<button type="button" (click)="playVideo(id)">Play</button>
<button type="button" (click)="pauseVideo(id)">Pause</button>
```

Just copy the Youtube component to your app and implement it as seen
in app.component.html (don't forget to set a video id :) ).

Created with Angular 2 v2.2.1