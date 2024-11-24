// Variables globales
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
    background = document.getElementById('bg-img'),
    steps = document.querySelectorAll('.volume-step');

const music = new Audio();

// Liste des chansons
const songs = [
    {
        path: 'assets/Frères de Fumée.mp3',
        displayName: 'Frères de Fumée',
        cover: 'image/1.jpg',
        artist: 'L°Insolent',
    },
    {
        path: 'assets/VALHALLA.mp3',
        displayName: 'VALHALLA',
        cover: 'image/VALHALLA.jpg',
        artist: 'artel',
    },
    {
        path: 'assets/Haut de gamme.mp3',
        displayName: 'haut de gamme',
        cover: 'image/hautgamme.jpg',
        artist: 'Joyca,boostee',
    },
    {
        path: 'assets/FAIS NOUS VOIR.mp3',
        displayName: 'Fais nous voir',
        cover: 'image/fais nous voir.jpeg',
        artist: 'Deen burbigo',
    },
    {
        path: 'assets/Doigby - GUERRIER.mp3',
        displayName: 'Doigby-GUERRIER',
        cover: 'image/doigt.jpeg',
        artist: 'Direkt',
    },
    {
        path: 'assets/Clash Assassins.mp3',
        displayName: 'Clash Assassins',
        cover: 'image/Clash Assassins.jpg',
        artist: 'joyca,mastu',
    },
    {
        path: 'assets/Mauvais Sang.mp3',
        displayName: 'Mauvais Sang',
        cover: 'image/MauvaisSang.jpeg',
        artist: 'L°Insolent',
    },
    {
        path: 'assets/Cendres et Mensonges.mp3',
        displayName: 'Cendres et Mensonges',
        cover: 'image/Cendres et Mensonges.jpeg',
        artist: 'L°Insolent',
    },
    {
        path: 'assets/Même Pas en Rêve.mp3',
        displayName: 'Même Pas en Rêve',
        cover: 'image/Même Pas en Rêve.jpeg',
        artist: 'L°Insolent',
    },
    {
        path: 'assets/Aiguisé comme une Lame.mp3',
        displayName: 'Aiguisé comme une Lame',
        cover: 'image/Aiguisé comme une Lame.jpeg',
        artist: 'L°Insolent',
    }
];

let musicIndex = 0;
let isPlaying = false;

// Lecture / Pause
function togglePlay() {
    isPlaying ? pauseMusic() : playMusic();
}

function playMusic() {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    music.play();
}

function pauseMusic() {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    playBtn.setAttribute('title', 'Play');
    music.pause();
}

// Charger une chanson
function loadMusic(song) {
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

// Changer de musique
function changeMusic(direction) {
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

// Barre de progression
function updateProgressBar() {
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2, '0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}

// Ajuster la barre de progression
function setProgressBar(e) {
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

// Contrôle du volume
steps.forEach((step, index) => {
    step.addEventListener('click', function () {
        const volume = parseFloat(this.getAttribute('data-volume'));
        music.volume = volume;

        // Mettre à jour les couleurs
        steps.forEach((s, i) => {
            s.style.backgroundColor = i <= index ? '#bebbbb9c' : '#ffffff';
        });
    });
});

// Événements
playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);

// Charger la première chanson
loadMusic(songs[musicIndex]);
