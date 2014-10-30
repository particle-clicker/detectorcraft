function handleDragStart(e) {

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault(); // Necessary. Allows us to drop.
  }

  e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

  return false;
}

function paletteDragStart(e) {

  dragSrcEl = this;

  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', this.innerHTML);

  window.paletteGrab = true;
}

//If a detector is dropped on the stack's background, append it to the end of the stack
//if a detector is dropped on another detector, insert it before that detector.
function handleDetDrop(e) {

  if (e.stopPropagation) {
    e.stopPropagation(); // Stops some browsers from redirecting.
  }

  var detStack, det;

  detStack = document.getElementById('detStack');

  if(window.paletteGrab){
    det = dragSrcEl.cloneNode(true)
  } else {
    det = dragSrcEl;
  }

  det.addEventListener('dragstart', handleDragStart, false);
  det.addEventListener('drop', handleDetDrop, false);

  if (this.getAttribute('class') == 'column')
    detStack.insertBefore(det, this);
  else
    detStack.appendChild(det);

  window.paletteGrab = false;

  return false;
}
