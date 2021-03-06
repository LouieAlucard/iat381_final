
// draggable task icon
interact('.dagger')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
    },

    // call this function on every dragmove event
    onmove: function (event) {

      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
          y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    },

    // call this function on every dragend event
    onend: function (event) {
      var target = event.target,
          // keep the dragged position in the data-x/data-y attributes
          x = 0;
          y = 0,

      // translate the element
      target.style.webkitTransform =
      target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

      // update the posiion attributes
      target.setAttribute('data-x', x);
      target.setAttribute('data-y', y);
    }
  });






interact('.hole').dropzone({
  // only accept elements matching this CSS selector
  // accept: '#yes-drop',
  // Require a 75% element overlap for a drop to be possible
  overlap: 0.1,

  // listen for drop related events:

  // when start dragging
  ondropactivate: function (event) {
  },

  // when hold over dropzone
  ondragenter: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    dropzoneElement.classList.add('inserted');
    
  
  },

  // when hold but leave dropzone
  ondragleave: function (event) {
  
  },

  // when drop into dropzon
  ondrop: function (event) {
    var draggableElement = event.relatedTarget,
        dropzoneElement = event.target;

    dropzoneElement.classList.add('inserted');

  },

  // when drop
  ondropdeactivate: function (event) {
   
  }
});

