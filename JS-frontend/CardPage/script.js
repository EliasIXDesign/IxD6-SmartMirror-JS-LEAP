let imageID = 1;
let images = [];

const container = document.querySelector('.container');
const carousel = document.querySelector('.carousel');

createArray();

function createArray (){
    for (let i = 0; i < 3; i++) {
        insertArray(i);
    }
    for (let i = 0; i < images.length ; i++) {
        carousel.appendChild(images[i].element);
    }
}
function insertArray(i){
    let img = document.createElement("img");
    img.src = `Img/${i+1}.jpg`;
    img.id = "imageID";
    images.push({id:img.id, element: img});
    imageID++;
}

// PRINTER BILLEDE TIL SKÆRM
window.addEventListener('keydown', function (e){
    if(e.key === 'k'){
        setTimeout(printFunc, 500);
    }
})

async function printFunc(){
    let newImg = document.createElement('img');
    newImg.src = "Img/6.jpg";
    newImg.classList.add('draggable-container')
    newImg.id = "imageID";
    document.querySelector('.container').appendChild(newImg);
}


//INTERACT JS
interact('.draggable-container').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        // enable autoScroll
        autoScroll: false,

        listeners: {
            // call this function on every dragmove event
            move: dragMoveListener,
        }
    })

function dragMoveListener (event) {
    let target = event.target
    // keep the dragged position in the data-x/data-y attributes
    let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
    let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

    // translate the element
    target.style.transform = 'translate(' + x + 'px, ' + y + 'px)'

    // update the posiion attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}




// MISC AND NOT USED

/*
function draw(){
    for(let i = 0;i<images.length;i++){
        const existingImage = document.getElementById(images[i].id)
        if(!existingImage)
            container.appendChild(images[i].element)
    }
    return 1;
}
 */


