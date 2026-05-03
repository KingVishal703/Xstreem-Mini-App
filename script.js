const container = document.getElementById("reels-container");

const API_URL = "https://peaceful-temple-72354-f29bf1f48951.herokuapp.com/"; // 🔴 CHANGE THIS

let videos = [];
let currentIndex = 0;

// ================= LOAD VIDEOS =================
async function loadVideos() {
    try {
        const res = await fetch(`${API_URL}/videos`);
        const data = await res.json();

        videos = data.videos;
        renderVideos();
    } catch (e) {
        console.error("Error loading videos:", e);
    }
}

// ================= RENDER =================
function renderVideos() {
    container.innerHTML = "";

    videos.forEach((vid, index) => {
        const div = document.createElement("div");
        div.className = "reel";

        const video = document.createElement("video");

        if (vid.type === "ad") {
            video.src = vid.url;

            video.onclick = () => {
                window.open(vid.link, "_blank");
            };

        } else {
            video.src = API_URL + vid.url;
        }

        video.playsInline = true;
        video.muted = false;
        video.loop = true;

        if (index === 0) {
            video.autoplay = true;
        }

        const caption = document.createElement("div");
        caption.className = "caption";
        caption.innerText = vid.caption || "";

        div.appendChild(video);
        div.appendChild(caption);
        container.appendChild(div);
    });

    observeVideos();
}

// ================= AUTO PLAY =================
function observeVideos() {
    const options = {
        root: container,
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector("video");

            if (entry.isIntersecting) {
                video.play();
            } else {
                video.pause();
            }
        });
    }, options);

    document.querySelectorAll(".reel").forEach(el => {
        observer.observe(el);
    });
}

// ================= SCROLL FIX =================
container.addEventListener("scroll", () => {
    const reels = document.querySelectorAll(".reel");

    reels.forEach((reel, index) => {
        const rect = reel.getBoundingClientRect();

        if (rect.top >= 0 && rect.top < window.innerHeight / 2) {
            currentIndex = index;
        }
    });
});

// ================= INIT =================
loadVideos();
