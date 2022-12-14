

let config = {
    "debug": true,
    "enableWorker": true,
    "lowLatencyMode": false,
    "startPosition": false,
    "backBufferLength": 0
};

if (video.canPlayType("application/vnd.apple.mpegurl")) {
    video.src = videoSrc;
} else if (Hls.isSupported()) {
    var hls = new Hls(config);
    hls.loadSource(videoSrc);
    hls.attachMedia(video);
    //video.play(); //not work on chrome
}

video.currentTime +=  10000;

setInterval(() => { //to fix
    if(video.paused)  {
    video.currentTime +=  2; 
    }//1.5
    //video.play();
}, 800);

setInterval(() => { //to fix
    hls.startLoad(0);
}, 180000);
