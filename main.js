const playBtns = document.querySelectorAll('.play-btn');
const progressBars = document.querySelectorAll('.progress-bar');
const currentTimeDisplays = document.querySelectorAll('.time');
const volumeBtns = document.querySelectorAll('.volume-btn');
const audios = document.querySelectorAll('audio');

function updateProgress(audio, progressBar, currentTimeDisplay){
  const progress = (audio.currentTime / audio.duration) * 100;
  progressBar.value = progress;

  const minutes = Math.floor(audio.currentTime / 60);
  const seconds = Math.floor(audio.currentTime % 60);
  currentTimeDisplay.textContent = `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

function stopAllAudios(){
    audios.forEach(audio =>{
      if (!audio.paused){
        audio.pause();
        audio.currentTime = 0;
      }
    });
    playBtns.forEach(btn =>{
        btn.innerHTML = '<img src="./icons/icon_play.png" alt="Play" />';
    });
}

function togglePlay(audio, playBtn){
  if (audio.paused){
    stopAllAudios();
    audio.play();
    playBtn.innerHTML = '<img src="./icons/icon_pause.png" alt="Pause" />';
  } else{
    audio.pause();
    playBtn.innerHTML = '<img src="./icons/icon_play.png" alt="Play" />';
  }
}

playBtns.forEach(playBtn =>{
    const audioId = playBtn.getAttribute('data-audio');
    const audio = document.getElementById(audioId);
  
    playBtn.addEventListener('click', () => togglePlay(audio, playBtn));
});

function setProgress(audio, progressBar){
  const progress = (progressBar.value / 100) * audio.duration;
  audio.currentTime = progress;
}

function toggleVolume(audio, volumeBtn){
  if (audio.volume > 0){
    audio.volume = 0;
    volumeBtn.innerHTML = '<img src="./icons/icon_volume_none.png" alt="Mute" />';
  } else{
    audio.volume = 1;
    volumeBtn.innerHTML = '<img src="./icons/icon_volume.png" alt="Volume" />';
  }
}

playBtns.forEach((playBtn, index) =>{
  const audio = document.getElementById(`audio${index + 1}`);
  const progressBar = progressBars[index];
  const currentTimeDisplay = currentTimeDisplays[index];
  const volumeBtn = volumeBtns[index];

  playBtn.addEventListener('click', () => togglePlay(audio, playBtn));

  progressBar.addEventListener('input', () => setProgress(audio, progressBar));

  volumeBtn.addEventListener('click', () => toggleVolume(audio, volumeBtn));

  audio.addEventListener('timeupdate', () => updateProgress(audio, progressBar, currentTimeDisplay));
});