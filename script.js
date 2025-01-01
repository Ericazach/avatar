navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    const microphone = audioContext.createMediaStreamSource(stream);
    microphone.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const update = () => {
        analyser.getByteFrequencyData(dataArray);
        const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;

        if (volume > 10) {
            console.log("Estás hablando 🗣️");
            document.body.classList.add("hablando"); // Clase para mover la boca
        } else {
            document.body.classList.remove("hablando");
        }
        requestAnimationFrame(update);
    };

    update();
}).catch(console.error);