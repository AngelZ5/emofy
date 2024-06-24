let trackList = [
  {
    name: "Shadows of Sarah",
    artist: "IA Generated",
    path: "./src/music/Shadows of Sarah.mp3",
  },
  {
    name: "Starry Skies",
    artist: "IA Generated",
    path: "./src/music/Starry Skies.mp3",
  },
];

let currentTrackIndex = 0;
let isPlaying = false;
let updateTimer;

// Criar um novo elemento de áudio
let currentTrack = document.createElement("audio");

// Referências aos elementos do DOM
const playPauseBtn = document.querySelector(".playpause-track");
const nextBtn = document.querySelector(".next-track");
const prevBtn = document.querySelector(".prev-track");
const seekSlider = document.querySelector(".seek_slider");
const currentTimeElem = document.querySelector(".current-time");
const totalDurationElem = document.querySelector(".total-duration");
const trackNameElem = document.querySelector(".track-name");
const trackArtistElem = document.querySelector(".track-artist");
const diskElem = document.querySelector(".disk");

// Carregar a faixa
function loadTrack(index) {
  clearInterval(updateTimer);
  resetValues();

  currentTrack.src = trackList[index].path;
  currentTrack.load();

  trackNameElem.textContent = trackList[index].name;
  trackArtistElem.textContent = trackList[index].artist;

  updateTimer = setInterval(seekUpdate, 1000);

  currentTrack.addEventListener("ended", nextTrack);
}

function resetValues() {
  currentTimeElem.textContent = "00:00";
  totalDurationElem.textContent = "00:00";
  seekSlider.value = 0;
}

function playPauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  currentTrack.play();
  isPlaying = true;
  playPauseBtn.innerHTML = '<i class="fa fa-pause-circle"></i>';
  diskElem.style.animationPlayState = "running";
}

function pauseTrack() {
  currentTrack.pause();
  isPlaying = false;
  playPauseBtn.innerHTML = '<i class="fa fa-play-circle"></i>';
  diskElem.style.animationPlayState = "paused";
}

function nextTrack() {
  if (currentTrackIndex < trackList.length - 1) currentTrackIndex += 1;
  else currentTrackIndex = 0;

  loadTrack(currentTrackIndex);
  playTrack();
}

function prevTrack() {
  if (currentTrackIndex > 0) currentTrackIndex -= 1;
  else currentTrackIndex = trackList.length - 1;

  loadTrack(currentTrackIndex);
  playTrack();
}

function seekTo() {
  let seekTo = currentTrack.duration * (seekSlider.value / 100);
  currentTrack.currentTime = seekTo;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(currentTrack.duration)) {
    seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    seekSlider.value = seekPosition;

    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(
      currentTrack.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(currentTrack.duration / 60);
    let durationSeconds = Math.floor(
      currentTrack.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    currentTimeElem.textContent = currentMinutes + ":" + currentSeconds;
    totalDurationElem.textContent = durationMinutes + ":" + durationSeconds;
  }
}

// Carregar a faixa inicial
loadTrack(currentTrackIndex);

// Adicionar eventos aos botões
playPauseBtn.addEventListener("click", playPauseTrack);
nextBtn.addEventListener("click", nextTrack);
prevBtn.addEventListener("click", prevTrack);
seekSlider.addEventListener("input", seekTo);
