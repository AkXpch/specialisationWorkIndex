// Create the audio system
const audioContext = new AudioContext();

const panner = audioContext.createStereoPanner();
const volume = audioContext.createGain();

// Connect the audio system
panner.connect(volume);
volume.connect(audioContext.destination);


// Select the stickers inside the demo
const stickers = document.querySelectorAll(".sticker-demo .sticker");


// Give each sticker its own sound and behavior
stickers.forEach(function(sticker) {

    // Load the sound file
    const sound = new Audio("assets/audio/" + sticker.dataset.sound);

    // Connect the sound to the audio system
    const source = audioContext.createMediaElementSource(sound);
    source.connect(panner);

    // Make the sound loop
    sound.loop = true;

    // Track whether the sound is playing as part of the music
    let isPlaying = false;


    // HOVER: Play a sound preview
    sticker.addEventListener("mouseenter", function() {

        if (isPlaying == false) {
            sound.currentTime = 0;
            sound.play();
        }

    });


    // LEAVE: Stop the preview if the sound is not activated
    sticker.addEventListener("mouseleave", function() {

        if (isPlaying == false) {
            sound.pause();
            sound.currentTime = 0;
        }

    });


    // CLICK: Toggle the sound on or off
    sticker.addEventListener("click", function() {

        // Allow the browser to start audio
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        if (isPlaying == false) {

            // Start the sound loop
            isPlaying = true;
            sticker.classList.add("playing");

            sound.currentTime = 0;
            sound.play();

        } else {

            // Stop the sound loop
            isPlaying = false;
            sticker.classList.remove("playing");

            sound.pause();
            sound.currentTime = 0;

        }

    });

});

//Kitchen sticker

const kitchenStickers = document.querySelectorAll("#kitchen-demo .sticker");
const interactionText = document.getElementById("interaction-text");

kitchenStickers.forEach(function(sticker) {

    let isPlaying = false;

    // mouse moves over
    sticker.addEventListener("mouseenter", function() {
        if (isPlaying == false) {
            interactionText.textContent = "Hovered - no border, lighter";
        }
    });

    //mouse leaves a sticker
    sticker.addEventListener("mouseleave", function() {
        if (isPlaying == false) {
            interactionText.textContent =
                "Hover over a sticker to see its effect.";
        }
    });

    // clicks 
    sticker.addEventListener("click", function() {
        if (isPlaying == false) {
            isPlaying = true;
            sticker.classList.add("playing");
            interactionText.textContent =
                "Clicked - added to loop, darker";
        } else {
            isPlaying = false;
            sticker.classList.remove("playing");
            interactionText.textContent =
                "Removed from loop — original appearance";
        }
    });

});