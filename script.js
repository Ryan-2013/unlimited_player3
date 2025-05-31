document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const playButton = document.getElementById('playButton');
    const fileList = document.getElementById('fileList');
    const mediaPlayer = document.getElementById('mediaPlayer');
    const nowPlaying = document.getElementById('nowPlaying');

    let files = [];
    let currentFileIndex = 0;

    function initEvents() {
        fileInput.addEventListener('change', handleFileSelect);
        playButton.addEventListener('click', startPlayback);
        mediaPlayer.addEventListener('ended', playNextFile);
        mediaPlayer.addEventListener('loadedmetadata', updateNowPlaying); // 每次載入新媒體時更新名稱
    }

    function handleFileSelect(event) {
        files = Array.from(event.target.files);
        currentFileIndex = 0;
        updateFileList();
        togglePlayButton();
        updateNowPlaying(); // 初始更新一次
    }

    function togglePlayButton() {
        playButton.disabled = files.length === 0;
    }

    function startPlayback() {
        if (files.length === 0) return;
        playFile(currentFileIndex);
    }

    function playNextFile() {
        if (files.length === 0) return;
        currentFileIndex = (currentFileIndex + 1) % files.length;
        playFile(currentFileIndex);
    }

    function playFile(index) {
        const file = files[index];
        const fileURL = URL.createObjectURL(file);
        mediaPlayer.src = fileURL;
        mediaPlayer.play();
    }

    function updateFileList() {
        fileList.innerHTML = '';
        files.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            li.style.cursor = 'pointer';
            li.addEventListener('click', () => {
                currentFileIndex = index;
                playFile(currentFileIndex);
            });
            fileList.appendChild(li);
        });
    }

    function updateNowPlaying() {
        if (files.length === 0) {
            nowPlaying.textContent = '目前無播放內容';
        } else {
            const file = files[currentFileIndex];
            nowPlaying.textContent = `播放中：${file.name}`;
        }
    }

    initEvents();
});
