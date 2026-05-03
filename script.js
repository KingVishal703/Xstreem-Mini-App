const container = document.getElementById("reels-container");

let videos = [];
let current = 0;

async function loadVideos() {
    const res = await fetch("https://YOUR-BACKEND-URL/videos");
    const data = await res.json();
    videos = data.videos;

    renderVideos();
}

function renderVideos() {
    videos.forEach((vid, index) => {
        const div = document.createElement("div");
        div.className = "reel";

        const video = document.createElement("video");
        video.src = "https://YOUR-BACKEND-URL" + vid.url;
        video.controls = false;
        video.autoplay = index === 0;
        video.loop = true;

        div.appendChild(video);
        container.appendChild(div);
    });
}

// scroll logic
window.addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
        nextVideo();
    } else {
        prevVideo();
    }
});

function nextVideo() {
    if (current < videos.length - 1) {
        current++;
        scrollToVideo();
    }
}

function prevVideo() {
    if (current > 0) {
        current--;
        scrollToVideo();
    }
}

function scrollToVideo() {
    container.children[current].scrollIntoView({ behavior: "smooth" });

    document.querySelectorAll("video").forEach((v, i) => {
        v.pause();
        if (i === current) v.play();
    });
}

loadVideos();
