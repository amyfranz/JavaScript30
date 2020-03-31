const player = document.querySelector(".player");
const video = player.querySelector(".viewer");
const progress = player.querySelector(".progress");
const progressBar = player.querySelector(".progress__filled");
const toggle = player.querySelector(".toggle");
const skipBtn = player.querySelectorAll("[data-skip]");
const ranges = player.querySelectorAll(".player__slider");

const togglePlay = () => (video.paused ? video.play() : video.pause());
const checkPlay = e => {
  toggle.textContent = e.target.paused ? "►" : "❚ ❚";
};

const skip = e => {
  video.currentTime += parseFloat(e.target.dataset.skip);
};

const changeRange = e => {
  video[e.target.name] = e.target.value;
};

const scrub = e => {
  const time = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = time;
};

const videoProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
};
video.addEventListener("click", togglePlay);
video.addEventListener("timeupdate", videoProgress);
video.addEventListener("play", e => checkPlay(e));
video.addEventListener("pause", e => checkPlay(e));
toggle.addEventListener("click", togglePlay);
skipBtn.forEach(btn => btn.addEventListener("click", e => skip(e)));
ranges.forEach(range => range.addEventListener("change", e => changeRange(e)));
ranges.forEach(range =>
  range.addEventListener("mousemove", e => changeRange(e))
);
let mousedown = false;
progress.addEventListener("click", e => scrub(e));
progress.addEventListener("mousemove", e => mousedown && scrub(e));
progress.addEventListener("mousedown", () => (mousedown = true));
progress.addEventListener("mouseup", () => (mousedown = false));
