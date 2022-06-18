//variables
let images = [];
let imageID = 1;
let imagesOnScreen = 1;


// initialize inactivity function

window.onload = function() {
    inactivityTime(false);
}

// when taking a photo of card
window.addEventListener('keydown', function (e){
    inactivityTime(true);
    console.log("enter pressed!");
    if(e.key === 'Enter' && imagesOnScreen<=6){
        setTimeout(insertImage, 500);
    }
})

async function insertImage(){
    let newImg = document.createElement('img');
    let imageDiv = document.querySelector(`.input-${imagesOnScreen}`);
    newImg.src = `Img_2/${imageID}.jpg`;

    if(doesFileExist(newImg.src)){
        newImg.id =`${imageID}`;
        newImg.classList.add('input-img');

        imageDiv.appendChild(newImg);
        console.log(`image number ${imagesOnScreen} with ID: ${imageID}`);
        update();
    }
}

function doesFileExist(urlToFile) {
    //initialize an HXMLHttpRequest object
    let xhr = new XMLHttpRequest();

    //open request
    xhr.open('GET', urlToFile, false);
    //send request
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

function update(){
    imageID++;
    imagesOnScreen++;
}

window.addEventListener('keydown', function (e){
    // " " for spacebar
    if(e.key === " " && imagesOnScreen > 1){
        setTimeout(sendInput, 300);
    }
})

function sendInput(){
    for (let i = images.length+1; i < imageID ; i++) {
        insertImageInArray(i);
    }
    for (let j = 1; j <imagesOnScreen ; j++) {
        clearPage(j);
    }
    inactivityTime(true);
    setTimeout(printPopup,10);
    setTimeout(deletePopup,4000);
    imagesOnScreen = 1;
    setTimeout(function (){
        inactivityTime(false)
    },4300);

}

function insertImageInArray(i){
    let img = document.getElementById(`${i}`);
    const length = images.length;

    if (length < img.id) {
        images.push({id: img.id, element: img})
        console.log(`Entry of Array after insert has ID ${img.id} at place ${length}`);
    }
}

function clearPage(j){
    let imageDiv = document.querySelector(`.input-${j}`);

    //clear page if the div element has a child (img element)
    if (imageDiv.childElementCount !== 0){
        let child = imageDiv.lastChild;
        imageDiv.removeChild(child);
    }
}


function inactivityTime(n) {
    let isPopUp = n;
    const modal = document.getElementById("modal-idle");
    modal.style.display="none";
    if (isPopUp === false){
        inactive();
    }
    if (isPopUp === true){
        active();
    }
    function inactive() {
        createIdleArray();
        modal.style.display = "block";
    }

    function active(){
        modal.style.display = "none";
    }
    function resetTimer() {
        clearTimeout(time);
        //change the duration before idle screen HERE
        time = setTimeout(inactive, 1500)
        // 1000 milliseconds = 1 second
        setTimeout(active, 100);
    }
}

function createIdleArray(){
    //copies array and then shuffles it
    let randomArray = images.slice();
    shuffle(randomArray);


    if(document.querySelector(".modal-image-1").childElementCount > 0){
        //gets every img element in DOM
        let div = document.querySelector(".modal-content");
        let images = div.getElementsByTagName("img");

        //remove images if there is any on modal screen
        let l = images.length;
        for (let i = 0; i < l; i++) {
            images[0].parentNode.removeChild(images[0]);
        }
    }
    for (let i = 0; i < images.length; i++) {
        if(i <6){
            insertArray(i, randomArray);
        }
    }
}

function insertArray(i, array){
    let imageDiv = document.querySelector(`.modal-image-${i+1}`);
    //removing class and CSS attributes before inserted on modal page
    images[i].element.classList.remove("input-img");
    imageDiv.appendChild(array[i].element);
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

function printPopup(){
    const popUp = document.getElementById("modal-thank-page");
    popUp.style.display = "block";
}

function deletePopup(){
    const popUp = document.getElementById("modal-thank-page");
    popUp.style.display = "none";
}