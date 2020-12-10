function app() {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play-section-button");
  const playLine = document.querySelector(".moving-line line"); //<hr />
  const video = document.querySelector(".video");
  const videoSourse = document.querySelector(".video sourse");
  const sounds = document.querySelectorAll(".songs button");
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  const time = document.getElementById("songs-duration");
  let fakeDuration = 50;
  let procentForHr = 0;
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-soung");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });
  play.addEventListener("click", () => {
    checkPlaying(song);
  });
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration += +this.getAttribute("data-time");
      console.log(fakeDuration);
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });
  function checkPlaying(song) {
    if (song.paused) {
      song.play();
      video.play();
      if (!play.classList.contains("play-section-button-pause")) {
        play.classList.toggle("play-section-button-pause");
      }
    } else {
      song.pause();
      video.pause();
      play.classList.remove("play-section-button-pause");
    }
  }
  song.ontimeupdate = () => {
    const currentTime = song.currentTime;
    const elapsed = fakeDuration - currentTime;
    const seconds = Math.floor(elapsed % 60);
    const minutes = Math.floor(elapsed / 60);
    procentForHr = ((100 * currentTime) / fakeDuration).toFixed(3);
    time.style.width = `${procentForHr}%`;
    timeDisplay.textContent = `${minutes}:${seconds}`;
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.classList.remove("play-section-button-pause");
    }
  };
}

app();
