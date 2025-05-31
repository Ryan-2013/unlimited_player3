document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const playButton = document.getElementById('playButton');
    const fileList = document.getElementById('fileList');
    const mediaPlayer = document.getElementById('mediaPlayer');
    const nowPlaying = document.getElementById('nowPlaying');

    let files = [];
    let currentFileIndex = 0;

    fileInput.addEventListener('change', (event) => {
        files = Array.from(event.target.files);
        updateFileList();
        playButton.disabled = files.length === 0;
        nowPlaying.textContent = '目前無播放內容';
    });

    playButton.addEventListener('click', () => {
        if (files.length > 0) {
            currentFileIndex = 0;
            playCurrentFile();
        }
    });

    mediaPlayer.addEventListener('ended', () => {
        if (files.length > 0) {
            currentFileIndex = (currentFileIndex + 1) % files.length;
            playCurrentFile();
        }
    });

    function updateFileList() {
        fileList.innerHTML = '';
        files.forEach((file, index) => {
            const listItem = document.createElement('li');
            listItem.textContent = file.name;
            listItem.style.cursor = 'pointer';
            listItem.addEventListener('click', () => {
                currentFileIndex = index;
                playCurrentFile();
            });
            fileList.appendChild(listItem);
        });
    }

    function playCurrentFile() {
        const currentFile = files[currentFileIndex];
        const fileURL = URL.createObjectURL(currentFile);
        mediaPlayer.src = fileURL;
        mediaPlayer.load();
        mediaPlayer.play();
        nowPlaying.textContent = `播放中：${currentFile.name}`;
    }
});
