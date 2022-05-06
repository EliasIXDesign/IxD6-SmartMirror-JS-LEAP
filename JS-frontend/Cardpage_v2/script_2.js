//variables
let images = [];
let imageID = 1;
let imagesOnScreen = 1;

window.onload = function() {
    inactivityTime();
}

window.addEventListener('keydown', function (e){
    if(e.key === 'Enter' && imagesOnScreen<=6){
        setTimeout(insertImage, 500);
    }
})
async function insertImage(){
    let newImg = document.createElement('img');
    let imageDiv = document.querySelector(`.input-${imagesOnScreen}`);
    newImg.src = `Img_2/${imageID}.png`;

    if(doesFileExist(newImg.src)){
        newImg.id =`${imageID}`;
        newImg.classList.add('input-img');

        imageDiv.appendChild(newImg);
        console.log(`image number ${imagesOnScreen} with ID: ${imageID}`);
        update();
    }
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

function update(){
    imageID++;
    imagesOnScreen++;
}

window.addEventListener('keydown', function (e){
    // " " for spacebar
    if(e.key === " " && imagesOnScreen > 1){
        sendInput();
    }
})

function sendInput(){
    for (let i = images.length+1; i < imageID ; i++) {
        insertImageInArray(i);
    }
    for (let j = 1; j <imagesOnScreen ; j++) {
        clearPage(j);
    }
    imagesOnScreen = 1;
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
    console.log(j);
    let imageDiv = document.querySelector(`.input-${j}`);

    if (imageDiv.childElementCount !== 0){
        let child = imageDiv.lastChild;
        imageDiv.removeChild(child);
    }

}


function inactivityTime() {
    const modal = document.querySelector(".modal-container");
    modal.style.display="none";
    let time;
    window.onload = resetTimer;
    // DOM Events
    document.onmousemove = resetTimer;
    document.onkeydown = resetTimer;

    function inactive() {
        createIdleArray();
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

function createIdleArray(){
    let  container = document.querySelector(".modal-content");
    let randomArray = images.slice();
    shuffle(randomArray);

    if(document.querySelector(".modal-image-1").childElementCount > 0){
        let images = document.getElementsByTagName('img');
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