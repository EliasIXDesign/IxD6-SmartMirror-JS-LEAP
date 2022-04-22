//variables
let imageID = 1;
let images = [];

//variables for manipulating html elements
const container = document.querySelector('.container');
const carousel = document.querySelector('.carousel');
const send_btn = document.querySelector('.sendbtn')

//creates array of first 3 pictures
createArray();

function createArray (){
    for (let i = 0; i < 3; i++) {
        insertArray(i);
    }
    for (let i = 0; i < images.length ; i++) {
        //places the html files in the html document
        carousel.appendChild(images[i].element);
    }
}

//insert the pictures source in array
function insertArray(i){
    //creates html element
    let img = document.createElement("img");
    //assign source
    img.src = `Img/${i+1}.jpg`;
    //assign an id
    img.id = `${imageID}`;
    console.log(`ImageId on image: ${img.id} is now ${imageID} on place ${i}`);
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

//when clicking on send button
send_btn.addEventListener('click', function (){
    if (imageID > images.length+1){
        insertNewImage();
    }
})

// Inserts newest taken picture and place it on screen
function insertNewImage(){
    let img = document.getElementById(`${imageID-1}`);
    let length = images.length-1;

    //if picture is not in array
    if (length < img.id){
        images.push({id:img.id, element: img})
        container.removeChild(img);
        length = images.length-1;
        console.log(`Id of last entry of Array after insert ${images.length} at place ${length}`);
        updateCarousel(carousel);
    }
}

async function printFunc(){
    let newImg = document.createElement('img');
    newImg.src = `Img/${imageID}.jpg`;
    newImg.classList.add('draggable-container')
    newImg.id = `${imageID}`;
    console.log(`ImageId on image posted: ${newImg.id} is now ${imageID}`);
    document.querySelector('.container').appendChild(newImg);
    updateImageId();
}

function updateImageId(){
    imageID++;
    console.log("imageId is updated to: " + imageID);
}

function updateCarousel(parent){
    let length = images.length-1;

    //removes pictures from container
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
    //insert picture in the list above
    for (let i = 3; i > 0 ; i--) {
        //use or otherwise pictures placement is fucked
        images[length].element.style.transform = "translate(0,0)";

        images[length].element.classList.remove("draggable-container");
        images[length].element.classList.add("carousel");
        parent.appendChild(images[length].element);
        length--;
    }
}



