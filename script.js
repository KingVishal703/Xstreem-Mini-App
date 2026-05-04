const API_URL = "https://peaceful-temple-72354-f29bf1f48951.herokuapp.com/feed"; // CHANGE THIS

const app = document.getElementById("app");

let feed = [];
let currentIndex = 0;

async function loadFeed() {
  app.innerHTML = `<div class="loader">Loading...</div>`;

  try {
    const res = await fetch(API_URL);
    const data = await res.json();

    feed = data.feed;

    renderVideos();
  } catch (e) {
    app.innerHTML = `<div class="loader">Error loading videos</div>`;
  }
}

function renderVideos() {
  app.innerHTML = "";

  feed.forEach((item, index) => {
    const container = document.createElement("div");
    container.className = "video-container";

    const video = document.createElement("video");
    video.src = item.url;
    video.loop = item.type === "video";
    video.muted = true;
    video.playsInline = true;

    // autoplay when visible
    video.addEventListener("click", () => {
      video.muted = !video.muted;
    });

    container.appendChild(video);
    app.appendChild(container);
  });

  setupScrollAutoPlay();
}

function setupScrollAutoPlay() {
  const videos = document.querySelectorAll("video");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          video.play();
        } else {
          video.pause();
        }
      });
    },
    { threshold: 0.7 }
  );

  videos.forEach((video) => observer.observe(video));
}

loadFeed();
