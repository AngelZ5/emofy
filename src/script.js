const audioPlayer = document.getElementById('audioPlayer');
        const playButton = document.getElementById('playButton');
        const pauseButton = document.getElementById('pauseButton');

        playButton.addEventListener('click', () => {
            audioPlayer.play();
        });

        pauseButton.addEventListener('click', () => {
            audioPlayer.pause();
        });
