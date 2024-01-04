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

//prev music function
function prevMusic() {
  musicIndex--; //decrement of musicIndex by 1
  musicIndex < 1 ? (musicIndex = data.length) : (musicIndex = musicIndex);
  loadMusic(musicIndex);
  playMusic();
}
//next music function
function nextMusic() {
  musicIndex++; //increment of musicIndex by 1
  musicIndex > data.length ? (musicIndex = 1) : (musicIndex = musicIndex);
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

const reqeatBtn = wrapper.querySelector("#reqeat-plist");

reqeatBtn.addEventListener("click", () => {
  let getText = reqeatBtn.innerText;

  switch (getText) {
    case "repeat":
      reqeatBtn.innerText = "repeat_one";
      reqeatBtn.setAttribute("title", "Song looped");
      break;
    case "repeat_one":
      reqeatBtn.innerText = "shuffle";
      reqeatBtn.setAttribute("title", "Playback shuffle");
      break;
    case "shuffle":
      reqeatBtn.innerText = "repeat";
      reqeatBtn.setAttribute("title", "PlayList Looped");
      break;
  }
});

mainAudio.addEventListener("ended", () => {
  let getText = reqeatBtn.innerText;

  switch (getText) {
    case "repeat":
      nextMusic();
      break;
    case "repeat_one":
      mainAudio.currentTime = 0;
      loadMusic(musicIndex);
      playMusic();
      break;
    case "shuffle":
      let randIndex = Math.floor(Math.random() * data.length + 1);
      do {
        randIndex = Math.floor(Math.random() * data.length + 1);
      } while (musicIndex == randIndex);
      musicIndex = randIndex;
      loadMusic(musicIndex);
      playMusic();
      break;
  }
});

const UlTag = wrapper.querySelector(".list");

for (let i = 0; i < data.length; i++) {
  let liTag = `
      <li data-audioId="${data[i].id}">
        <img src="assets/images/${data[i].img}" alt="" />
        <i class="material-icons list_img">play_arrow</i>
        <div>
          <h3>${data[i].name}</h3>
          <span>${data[i].auther}</span>
        </div>
        <audio src="assets/audio/${data[i].audio}"></audio>
      </li>
  `;
  UlTag.insertAdjacentHTML("beforeend", liTag);
}

const LiTag = UlTag.querySelectorAll("li");

LiTag.forEach((element) => {
  element.addEventListener("click", (event) => {
    musicIndex = element.dataset.audioid;
    loadMusic(musicIndex);
    playMusic();
  });
});
