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