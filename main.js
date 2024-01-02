const wrapper = document.querySelector(".wrapper");
const musicImg = wrapper.querySelector(".play__img");
const musicName = wrapper.querySelector(".play__card h3");
const musicAuthor = wrapper.querySelector(".play__card span");
const mainAudio = wrapper.querySelector("#main-audio");
const playPause = wrapper.querySelector(".play-pause");
const prevBtn = wrapper.querySelector("#prev");
const nextBtn = wrapper.querySelector("#next");
const progressBar = wrapper.querySelector(".progress__bar span");
const progressArea = wrapper.querySelector(".progress__bar");

import data from "./data/index.js";

let musicIndex = 1;

window.addEventListener("load", () => {
  loadMusic(musicIndex);
});

function loadMusic(indexNumb) {
  musicName.innerText = data[indexNumb - 1].name;
  musicAuthor.innerText = data[indexNumb - 1].auther;
  musicImg.src = `assets/images/${data[indexNumb - 1].img}`;
  mainAudio.src = `assets/audio/${data[indexNumb - 1].audio}`;
}

// play or music button event
function playMusic() {
  wrapper.classList.add("paused");
  playPause.querySelector("i").innerText = "pause";
  mainAudio.play();
}

// play or music button event
function pauseMusic() {
  wrapper.classList.remove("paused");
  playPause.querySelector("i").innerText = "play_arrow";
  mainAudio.pause();
}

function nextMusic() {
  musicIndex++;
  musicIndex > data.length ? (musicIndex = 1) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

function prevMusic() {
  musicIndex--;
  musicIndex < 1 ? (musicIndex = data.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}

// play or music button event
playPause.addEventListener("click", () => {
  const isMusicPause = wrapper.classList.contains("paused");

  isMusicPause ? pauseMusic() : playMusic();
});

// next music btn event
nextBtn.addEventListener("click", () => {
  nextMusic();
});

// prev music btn event
prevBtn.addEventListener("click", () => {
  prevMusic();
});

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime;
  const duration = e.target.duration;
  let progressWidth = (currentTime / duration) * 100;
  progressBar.style.width = `${progressWidth}%`;
  let musicCurrentTime = wrapper.querySelector(".timer-start");
  let musicDuration = wrapper.querySelector(".timer-end");

  mainAudio.addEventListener("loadeddata", () => {
    let audioDuration = mainAudio.duration;
    let totalMin = Math.floor(audioDuration / 60);
    let totalSec = Math.floor(audioDuration % 60);
    totalMin < 10 ? (totalMin = `0${totalMin}`) : `00:00`;
    totalSec < 10 ? (totalSec = `0${totalSec}`) : `00:00`;
    musicDuration.innerText = `${totalMin}:${totalSec}`;
  });

  let currentMin = Math.floor(currentTime / 60);
  let currentSec = Math.floor(currentTime % 60);
  currentMin < 10 ? (currentMin = `0${currentMin}`) : `00:00`;
  currentSec < 10 ? (currentSec = `0${currentSec}`) : `00:00`;
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
});

progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth;
  let clickedOffSetx = e.offsetX;
  let songDuration = mainAudio.duration;

  mainAudio.currentTime = (clickedOffSetx / progressWidthval) * songDuration;
  playMusic();
});
