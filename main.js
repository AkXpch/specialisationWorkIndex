const bathroomButton = document.getElementById("bathroom-button");
const kitchenButton = document.getElementById("kitchen-button");

const bathroomPage = document.getElementById("bathroom-page");
const kitchenPage = document.getElementById("kitchen-page");

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
        const sound = new Audio("Assignment2/audio/" + folder + "/" + sticker.dataset.sound);
        

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

//use above function to activate behavior
const kitchenSticker = document.querySelectorAll("#kitchen-page .sticker");
stickerBehavior(kitchenSticker, "kitchen");
