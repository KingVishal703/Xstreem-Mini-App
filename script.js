const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const streamBase = "https://abc.koyeb.app/watch/";

const streamLink = streamBase + id;

let time = 5;

const timer = document.getElementById("timer");
const btn = document.getElementById("watchBtn");

const countdown = setInterval(() => {

time--;
timer.innerText = time;

if(time <= 0){
clearInterval(countdown);
btn.disabled = false;
}

},1000);

btn.onclick = () => {

if(window.Telegram && Telegram.WebApp){
Telegram.WebApp.openLink(streamLink);
}else{
window.open(streamLink,"_blank");
}

};
