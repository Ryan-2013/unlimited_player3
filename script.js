document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const playButton = document.getElementById('playButton');
    const fileList = document.getElementById('fileList');
    const mediaPlayer = document.getElementById('mediaPlayer');

    let files = [];
    let currentFileIndex = 0;

    fileInput.addEventListener('change', (event) => {
        files = Array.from(event.target.files);
        updateFileList();
        if (files.length > 0) {
            playButton.disabled = false;
        } else {
            playButton.disabled = true;
        }
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
            fileList.appendChild(listItem);
        });
    }

    function playCurrentFile() {
        const currentFile = files[currentFileIndex];
        const fileURL = URL.createObjectURL(currentFile);
        mediaPlayer.src = fileURL;
        mediaPlayer.load(); // 重新載入以應用新的來源
        mediaPlayer.play();
    }
});