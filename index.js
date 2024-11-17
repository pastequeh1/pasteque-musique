const image = document.getElementById('cover'),
    title = document.getElementById('music-title'),
    artist = document.getElementById('music-artist'),
    currentTimeEl = document.getElementById('current-time'),
    durationEl = document.getElementById('duration'),
    progress = document.getElementById('progress'),
    playerProgress = document.getElementById('player-progress'),
    prevBtn = document.getElementById('prev'),
    nextBtn = document.getElementById('next'),
    playBtn = document.getElementById('play'),
    background = document.getElementById('bg-img');

const music = new Audio();

const songs = [
    {
        path: 'assets/Frères de Fumée.mp3',
        displayName: 'Frères de Fumée',
        cover: 'assets/1.jpg',
        artist: 'L°Insolent',
    },
    {
        path: 'assets/VALHALLA.mp3',
        displayName: 'VALHALLA',
        cover: 'assets/VALHALLA.jpg',
        artist: 'artel',
    },
    {
        path: 'assets/Haut de gamme.mp3',
        displayName: 'haut de gamme',
        cover: 'assets/hautgamme.jpg',
        artist: 'Joyca,boostee',
    },
    {
        path: 'assets/FAIS NOUS VOIR.mp3',
        displayName: 'Fais nous voir',
        cover: 'assets/fais nous voir.jpeg',
        artist: 'Deen burbigo',
    },
    {
        path: 'assets/Doigby - GUERRIER.mp3',
        displayName: 'Doigby-GUERRIER',
        cover: 'assets/doigt.jpeg',
        artist: 'Direkt',
    },
    {
        path: 'assets/Clash Assassins.mp3',
        displayName: 'Clash Assassins',
        cover: 'assets/Clash Assassins.jpg',
        artist: 'joyca,mastu',
    }
];

let musicIndex = 0;
let isPlaying = false;

function togglePlay() {
    if (isPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    isPlaying = true;
    // Change play button icon
    playBtn.classList.replace('fa-play', 'fa-pause');
    // Set button hover title
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    // Change pause button icon
    playBtn.classList.replace('fa-pause', 'fa-play');
    // Set button hover title
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

loadMusic(songs[musicIndex]);
