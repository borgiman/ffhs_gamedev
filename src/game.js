/*
    todo patrick
    ✅ display something on every click in the canvas
    ✅ display that something on the position of the mouse
    ❌ use a defense tower sprite as that something that gets displayed
    ❌ draw a circle with hardcoded radius around that sprite
    ❌ detect when the mouse is inside the circle and log something
    ❌ log only at most once every 2s
    ❌ instead of logging draw a rocket sprite on the position of the defense tower
    ❌ move that sprite a bit on every tick towards to the location where the mouse was detected
    ❌ turn the sprite so that the rotation matches the way it is moving
    ❌ when the target location is reached remove rocket sprite and replace with static explosion sprite
    ❌ remove static explosion sprite after 1s
    ❌ use the current location of the mouse as target of the rocket
    ❌ use last known position inside the circle of the mouse when it is outside for the target of the rocket
    ❌ play a sound when the rocket is flying
    ❌ play a sound on impact
 */

const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

canvasElement.addEventListener('mouseup', function(mouseEvent) {
    const canvasRect = canvasElement.getBoundingClientRect();
    const mouseX = mouseEvent.clientX - canvasRect.left;
    const mouseY = mouseEvent.clientY - canvasRect.top;

    context.beginPath();
    context.arc(mouseX, mouseY, 10, 0, 2 * Math.PI);
    context.stroke();
});
