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
interact('.draggable-carousel').draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    modifiers: [
        interact.modifiers.restrictRect({
            restriction: 'self',
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

    // update the position attributes
    target.setAttribute('data-x', x)
    target.setAttribute('data-y', y)
}

// enable draggables to be dropped into this
interact('.dropzone').dropzone({
    // only accept elements matching this CSS selector
    accept:'.draggable-carousel',
    // Require a 75% element overlap for a drop to be possible
    overlap: 75,

    // listen for drop related events:

    ondropactivate: function (event) {
        // add active dropzone feedback
        event.target.classList.add('drop-active')

    },
    ondragenter: function (event) {
        let draggableElement = event.relatedTarget
        let dropzoneElement = event.target

        // feedback the possibility of a drop
        dropzoneElement.classList.add('drop-target')
        draggableElement.classList.add('can-drop')
    },
    ondragleave: function (event) {
        // remove the drop feedback style
        event.target.classList.remove('drop-target')
        event.relatedTarget.classList.remove('can-drop')
        event.relatedTarget.textContent = 'Dragged out'
    },
    ondrop: function (event) {
        moveImage(event.relatedTarget);
        console.log("dropped");
    },
    ondropdeactivate: function (event) {
        // remove active dropzone feedback
        event.target.classList.remove('drop-active')
        event.target.classList.remove('drop-target')
    }
})

function moveImage(e){
    const container = document.querySelector('.container');

    e.classList.remove('carousel');
    e.classList.remove("draggable-carousel");
    e.classList.add("draggable-container");
    e.style.transform = 'translate(0,0)';

    e.setAttribute('data-x', 0);
    e.setAttribute('data-y', 0)

    container.appendChild(e);
}