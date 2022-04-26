//variables
let imageID = 1;
let images = [];

//variables for manipulating html elements
const container = document.querySelector('.container');
const carousel = document.querySelector('.carousel');
const send_btn = document.querySelector('.sendbtn')

//creates array of first 3 pictures
//createArray();

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

//when clicking on send button
send_btn.addEventListener('click', function (){
    //if ID is the same as the length of array +1, no pictures are posted
    if (!container.childNodes,length == 0){
        //FIXME
        //insert every posted picture in array above
        for (let i = images.length+1; i < imageID ; i++) {
            insertNewImage(i);
        }
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

async function printFunc(){

    let newImg = document.createElement('img');
    newImg.src = `Img/${imageID}.jpg`;

    if(doesFileExist(newImg.src)){
        newImg.classList.add('draggable-container')
        newImg.id = `${imageID}`;
        console.log(`image posted has ID : ${imageID}`);
        document.querySelector('.container').appendChild(newImg);

        updateImageId();
    }
}

function updateImageId(){
    imageID++;
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
        //use or otherwise pictures placement is fucked
        images[place].element.style.transform = "translate(0,0)";
        images[place].element.classList.remove("draggable-container");
        images[place].element.classList.add("draggable-carousel");
        //otherwise image when dragged back will have wanky position
        images[place].element.setAttribute('data-x',0);
        images[place].element.setAttribute('data-y',0);

        parent.appendChild(images[place].element);
        place--;
    }
}

function doesFileExist(urlToFile) {
    var xhr = new XMLHttpRequest();

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