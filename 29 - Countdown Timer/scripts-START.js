let countdown;
const timerDisplay = document.querySelector(".display__time-left");
const endTime = document.querySelector(".display__end-time");
const buttons = document.querySelectorAll(".timer__button");

const timer = seconds => {
  clearInterval(countdown);
  const now = Date.now();
  const then = now + seconds * 1000;
  displayTimeLeft(seconds);
  DisplayEndTime(then);
  countdown = setInterval(() => {
    const secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    displayTimeLeft(secondsLeft);
  }, 1000);
};

const displayTimeLeft = seconds => {
  const minutes = Math.floor(seconds / 60);
  let remainSeconds = seconds % 60;
  const displayTime = `${minutes}:${
    remainSeconds < 10 ? "0" : ""
  }${remainSeconds}`;
  timerDisplay.innerText = displayTime;
  console.log(minutes, remainSeconds);
};

const DisplayEndTime = timestamp => {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const minutes = end.getMinutes();
  endTime.innerText = `Be Back at ${hour > 12 ? hour - 12 : hour}:${
    minutes < 10 ? "0" : ""
  } ${minutes}${hour > 12 ? "pm" : "am"}`;
};

const startTimer = e => {
  const seconds = parseInt(e.target.dataset.time);
  timer(seconds);
};

buttons.forEach(button => button.addEventListener("click", e => startTimer(e)));
document.customForm.addEventListener("submit", e => {
  e.preventDefault();
  minutes = e.target.minutes.value;
  timer(minutes * 60);
  e.target.reset();
});
