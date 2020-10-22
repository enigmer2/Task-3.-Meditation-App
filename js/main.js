function app() {
  const song = document.querySelector(".song");
  const play = document.querySelector(".play-section-button");
  const playLine = document.querySelector(".moving-line line"); //<hr />
  const video = document.querySelector(".video");
  const videoSourse = document.querySelector(".video sourse");
  console.log(play);

  // Sound
  const sounds = document.querySelectorAll(".songs button");
  // Time display
  const timeDisplay = document.querySelector(".time-display");
  const timeSelect = document.querySelectorAll(".time-select button");
  // get the length of the <hr /> надо узнать width станицы или изменять hr.width проценты
  const time = document.getElementById("songs-duration");
  // duration of song
  let fakeDuration = 600;
  let procentForHr = 0;

  // выбираем песни
  sounds.forEach((sound) => {
    sound.addEventListener("click", function () {
      song.src = this.getAttribute("data-soung");
      video.src = this.getAttribute("data-video");
      checkPlaying(song);
    });
  });

  // play songs
  play.addEventListener("click", () => {
    checkPlaying(song);
  });

  // select sound
  timeSelect.forEach((option) => {
    option.addEventListener("click", function () {
      fakeDuration = this.getAttribute("data-time");
      timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(
        fakeDuration % 60
      )}`;
    });
  });

  // функция проверяет играет мелодия или нет
  function checkPlaying(song) {
    if (song.paused) {
      song.play();
      video.play();
      play.classList.toggle("play-section-button-pause"); 
    } else {
      song.pause();
      video.pause();
      play.classList.toggle("play-section-button-pause"); 
    }
  }

  // обновление цифр и полосы прогресса
  song.ontimeupdate = () => {
    const currentTime = song.currentTime;
    const elapsed = fakeDuration - currentTime;
    const seconds = Math.floor(elapsed % 60);
    const minutes = Math.floor(elapsed / 60);
    // animate the <hr/>
    procentForHr = ((100 * currentTime) / fakeDuration).toFixed(3); //округляем, записываем в <div wigth />
    time.style.width = `${procentForHr}%`;
    //  animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    // проверяем если наше время больше заданого то останавливаем
    if (currentTime >= fakeDuration) {
      song.pause();
      song.currentTime = 0;
      video.pause();
      play.classList.toggle("play-section-button-pause");
    }
  };
}

app();
