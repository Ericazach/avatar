navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);

        const dataArray = new Uint8Array(analyser.frequencyBinCount);

        // Function to calculate the volume
        const getVolume = () => {
            analyser.getByteFrequencyData(dataArray);

            const volume = dataArray.reduce((sum, value) => sum + value) / dataArray.length;
            return volume;
        };

        const update = () => {
            const volume = getVolume();

            if (volume > 10) {
                console.log("Estás hablando 🗣️");
                document.body.classList.add("hablando"); // Class to animate the avatar/mouth
            } else {
                document.body.classList.remove("hablando");
            }

            // Continuously check volume
            requestAnimationFrame(update);
        };

        update();
    })
    .catch((error) => {
        console.error("Error accessing the microphone: ", error);
        alert("Please allow microphone access for the avatar to react!");
    });