const bathroomButton = document.getElementById("bathroom-button");
const kitchenButton = document.getElementById("kitchen-button");

const bathroomPage = document.getElementById("bathroom-page");
const kitchenPage = document.getElementById("kitchen-page");

//Create Audio ssytem
const audioContext = new AudioContext();

const panner = audioContext.createStereoPanner();
const volume = audioContext.createGain();

//connect audio control
panner.connect(volume);
volume.connect(audioContext.destination);

kitchenButton.addEventListener("click", function() {
    // if "click" kitchen button -> show kitchen page and hide bathroom page
    kitchenPage.style.display = 'block';
    bathroomPage.style.display = 'none';
});

bathroomButton.addEventListener("click", function() {
    bathroomPage.style.display = 'block'
    kitchenPage.style.display = 'none'

});
// Use to check mouse position
document.addEventListener("click", function(event) {
    console.log("X:", event.clientX, "Y:", event.clientY);
});



// Create function of sticker behavior that will be use in each environment(bathroom and kitchen)
function stickerBehavior(stickers, folder){

    stickers.forEach(function(sticker) {
        const sound = new Audio("assets/audio/" + folder + "/" + sticker.dataset.sound);

        //take HTML audio and pt it in Audio API
        //AudioContext is the main entry point for the Web Audio API
        const source = audioContext.createMediaElementSource(sound);
        //sent that sound through panner
        source.connect(panner);

        sound.loop = true;
        //isPlaying = false -> not part of the remix
        // isPlaying = true -> part of the remix
        let isPlaying = false;

        // Sound Sample
        // When mouse enter the sticker -> play sample
        sticker.addEventListener("mouseenter", function() {
            //start sound from beginning and play
            if(isPlaying == false){
                sound.currentTime = 0; 
                sound.play();
            }
        
        });

        // when move mouse out of sticker -> sound stopplaying
        sticker.addEventListener("mouseleave", function() {
            if(isPlaying == false){
                sound.pause();
                sound.currentTime = 0;
            }
        
        
        });

        //click to add/remmove sound from remix
        sticker.addEventListener("click", function(){
            if(isPlaying == false){
                isPlaying = true;
                sound.currentTime = 0; 
                sound.play();

            }else {
                isPlaying = false;
                sound.pause();
                sound.currentTime = 0
            }
        })
    
    });
}
// Extense Technique
//when mouse move left and right -> sound pan left and right
// when mouse move up and down -> volume go loud and low

//use above(stickerBehavior) function to activate behavior
const kitchenSticker = document.querySelectorAll("#kitchen-page .sticker");
const bathroomSticker = document.querySelectorAll("#bathroom-page .sticker")
stickerBehavior(kitchenSticker, "kitchen");
stickerBehavior(bathroomSticker, "bathroom")

// Extended Technique -> mousemove()
function mouseMoveBehavior(scene) {
    scene.addEventListener("mousemove", function(event){
        //check if mouseover work
        //console.log("moving in img");

        //get mouse X position
        //event.clientX  = returns the horizontal X-coordinate of the mouse pointer relative to the visible browser window (built-in GPS that tells you exactly how far your mouse is from the left edge of the screen.)
        let mouseX = event.clientX
        // find where the environent(bg pic) start (horizontoly)
        let environmentLeft = scene.getBoundingClientRect().left; //. left = find the left edge of the picture

        //convert mouse position to -1 --- 0 ----1
        //((mouseX - environmentLeft) / environment.offsetWidth) is to convert to 0-1
        // but we want -1 - +1 so we add ( ) * 2 - 1;
        let pan = ((mouseX - environmentLeft) / scene.offsetWidth) * 2 - 1;

        // call panner to make it move left and right base on mouse positioin
        panner.pan.value = pan


        //Get moouse Y position 
        let mouseY = event.clientY
        // find where the environent(bg pic) start (verticaly)
        let environmentTop = scene.getBoundingClientRect().top;
        //convert Y into 1(top - loud) and 0(bottom - low)
        let volumeMouse = 1 - ((mouseY - environmentTop) / scene.offsetHeight);
        //Apply mouse to Y volume
        volume.gain.value = volumeMouse;
    });
}

//call mouseMoveBehavior function
mouseMoveBehavior(kitchenPage);
mouseMoveBehavior(bathroomPage);