//variables
let imageID = 1;
let images = [];

//variables for manipulating html elements
const container = document.querySelector('.container');
const carousel = document.querySelector('.carousel');
const send_btn = document.querySelector('.sendbtn')
const shuffle_btn = document.querySelector('.shuffleBtn');

window.onload = function() {
    inactivityTime();
}
//creates array of first 3 pictures
//createArray();

function createArray (){
    let imageArray = [];
    for (let i = 0; i < 3; i++) {
        insertArray(i);
    }
    for (let i = 0; i < 3; i++) {
        let randNum = getRandomInt(0,imageID-2);
        carousel.appendChild(images[randNum].element)
    }}

//insert the pictures source in array
function insertArray(i){
    //creates html element
    let img = document.createElement("img");
    //assign source
    img.src = `Img/${i+1}.jpg`;
    //assign an id
    img.id = `${imageID}`;
    img.classList.add("draggable-carousel");
    console.log(`ImageId on image: ${img.id} has place: ${i}`);
    //push to array
    images.push({id:img.id, element: img});
    updateImageId();
}

// PRINTER BILLEDE TIL SKÆRM
window.addEventListener('keydown', function (e){
    if(e.key === 'Enter'){
        setTimeout(printFunc, 500);
    }
})

async function printFunc(){
    let newImg = document.createElement('img');

    newImg.src = `Img/${imageID}.jpg`;

    if(doesFileExist(newImg.src)){
        newImg.classList.add('draggable-container')
        newImg.id = `${imageID}`;
        console.log(`image posted has ID : ${imageID}`);
        newImg.classList.add('yourInput');
        newImg.style.border = "solid 5px yellow";

        document.querySelector('.container').appendChild(newImg);

        updateImageId();
    }
}

function updateImageId(){
    imageID++;
}

function doesFileExist(urlToFile) {
    let xhr = new XMLHttpRequest();

    //open request
    xhr.open('HEAD', urlToFile, false);
    //send request
    xhr.send();

    if (xhr.status == "404") {
        return false;
    } else {
        return true;
    }
}

//when clicking on send button
send_btn.addEventListener('click', function (){
    let imagesContainer = container.getElementsByTagName('*').length;
    //if ID is the same as the length of array +1, no pictures are posted
    if (imagesContainer !== 0){
        //insert every posted picture in array above
        for (let i = images.length+1; i < imageID ; i++) {
            insertNewImage(i);
        }
        while (container.firstChild){
            container.removeChild(container.firstChild);
        }
        setTimeout(printPopup,10);
        setTimeout(deletePopup,5000);

    }
})

// Inserts newest taken picture and place it on screen
function insertNewImage(number){
    let img = document.getElementById(`${number}`);
    const length = images.length;

    //if picture is not in array
    if (length < img.id){
        images.push({id:img.id, element: img})
        console.log(`Entry of Array after insert has ID ${img.id} at place ${length}`);
        updateCarousel(carousel);
    }
}

function updateCarousel(parent){
    let place = images.length-1;
    let i;

    //if there's less than 3 pictures in array
    //otherwise for loop will try to iterate 3 times even there is not 3 pictures
    images.length < 3 ? i = images.length : i = 3;

    //removes pictures from container
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    //insert picture in the list above
    for (i; i > 0 ; i--) {
        resetImage(place);

        parent.appendChild(images[place].element);
        place--;
    }
}

shuffle_btn.addEventListener('click', function (){
    insertRandomImage();
})

function insertRandomImage(){
    while(carousel.firstChild){
        carousel.removeChild(carousel.firstChild);
    }
    for (let i = 0; i < 3; i++) {
        let randNum = getRandomInt(0,imageID-2);
        console.log(randNum);
        if(!container.contains(images[randNum].element)){
            resetImage(randNum)
            carousel.appendChild(images[randNum].element)
        }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let inactivityTime = function () {
    const modal = document.getElementById("modal");
    modal.style.display="none";
    let time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function inactive() {
      modal.style.display = "block";
    }

    function active(){
        modal.style.display = "none";
    }
    function resetTimer() {
        clearTimeout(time);
        time = setTimeout(inactive, 10000)
        // 1000 milliseconds = 1 second
        setTimeout(active, 100);
    }
}

function printPopup(){
    const popUp = document.getElementById("thanksModal");
    popUp.style.display = "block";
}

function deletePopup(){
    const popUp = document.getElementById("thanksModal");
    popUp.style.display = "none";
}


function resetImage(place){
    //use or otherwise pictures placement is fucked
    images[place].element.style.transform = "translate(0,0)";
    images[place].element.classList.remove("draggable-container");
    images[place].element.classList.add("draggable-carousel");
    images[place].element.style.border = "none";

    //otherwise image when dragged back will have wanky position
    images[place].element.setAttribute('data-x',0);
    images[place].element.setAttribute('data-y',0);
}