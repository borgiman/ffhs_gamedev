/*
    todo patrick
    ✅ display something on every click in the canvas
    ✅ display that something on the position of the mouse
    ✅ use a defense tower sprite as that something that gets displayed
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

    sprite sources, credit goes to Kenney.nl: https://opengameart.org/content/tower-defense-300-tilessprites
 */

const canvasElement = document.querySelector('canvas');
const context = canvasElement.getContext('2d');

const towerImage = new Image();
towerImage.src = ' data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAAHdbkFIAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyFpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpFMDUyQUJGQTU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpFMDUyQUJGQjU1NzYxMUU2QjMzNkQ2MTk5MTAxNjJCRiI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkUwNTJBQkY4NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkUwNTJBQkY5NTU3NjExRTZCMzM2RDYxOTkxMDE2MkJGIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+6m3sGwAABPBJREFUeNpi/P//PwNeAFKArGjt2rX/keWYGAgAggoYYcYrzQz5X/TbAS7Rx3qA4V76GkYWmACviRzDbIZ7cAW8DHLEWQFX8OnMwwV/P/8Es0H0JZN+RhAbIIAYiQoHGJg/f/5/EKZBOKCHAQj0sh64cD99jSE8HGZb3kPVeYbBgHgrGBkZGbT3Z/1n5GBh+P/7L8Ofd98YbgbMB8sBBBDhcCAAWFCsY2REkQSFGR8fH8OnT58YEhMTGbGFLxMDhYAFm2BRUdF/XGJ9fX2MWNMjLE2Ckh0h8PnMI3BapYoXUAwAZj94ksWaMP/9Z/j55APD/Yy1jFi9QA4ACCCKDaBuNCInJFC0WVtbM/z8+ZPhzJkzKNGH7GrqxsLQNICFmHwAEweCC/39/YY4DVCcEfyf4RaQVlQE8589ewYRh/Lv379vAFYDjDCsBoAy0h4TkPw97O61ZGDg/i5JWRgwcbIO5mgEFRT/fvzBqRiU1UFqcOZGUF4AhTKXujiYz8zLDtcIAt9uvgSXBSh6KM3OAAFEsQE0KdWx1THEpHZsKR1XXU/QAYSArq4uA6jSAwFQmQXCly9fNqB7MhzwfDDqAEoBzmyIXkHCimRSALD4xlmZEnQAqJ0EKpFgpRG54N/33wz///wDl2Kw9hTR2ZBSy7FVH6OJkCQHgOKOGuDXy8+glu8DknOBwoyg+YwMjAmw6hHUFGHiZsNbT/z79Yfh/8+/YPafj98Zfr34BG9Ok5QLkC2BOYTkbIjUjifZAfQCAAE04A4YzYYspLaGCgsLzwPlsTY80PvAhBIgWS0ikOWg1hA7OzsYgwdkPn0CtYZG08CoA0YdMOqAYVQUE1v0Euq04iuaiXYAyHL0PsGXL1/AGGWIB00NqE9AdggozAg+D3Q6xNe3yA9e6JgS3C/E14ZAy0HtQEYWJvzjTviAJWSeATS8AuqUkJwIQZYT6lQQAwh1bpjI7dGMlgOjDhjeDgB1JEEdSmoAQh1crA54kLFO8efj9+B5GlBBApqzIXlk5McfsN4vF56A54RI6prB+gWgopRNgo+BhZ8TIs7OzMDEhrv6AJn17+svUBCCAagEBFkO9FAizk4wPgdgcwSkeGNkYOZiQ/j291+G/2jD5MiW4+uYEHQAlkqFuLhHspxkB4yobAgQoH0zOG4QBqKoBLbPLsGduAXSgUsgHbgDfE4VLiGugVsutOCDcwgzIO9CFisaEwlHQplkd4YRPgikx0p87y7RCfz7jfDXa2LXsIVFV2+hbw6nmWOXI3jmoSiK00Ob/wSvXsyyzqR8xRbDKmh6aIWMkk5oZVlm0Ccbk9G8BBgAA2AADIABMAAGwADmlsIepa6TjdVI/VQqewdAUtdW2kIhbTO0bZrtOlVVeZPKkwBsXp62ok1yaT7ptzjua0ZK4MdRJO0BTp09Y1I8AGuJsB1KOIS/KPojRjVJZJQGuFef5H0JxJz4sIN/3t8EEXwP8FHQFQIEvwYZAANgAAyAAQQEoKTaY4vfg3Spw8tHnxiLkFzpMoFw7+a97sZC36jQGIMoQcoL6LW09zKHyTIVEg6vE4bJtih2NMFDxcG9DLZnIr0BGP4bfAfCUI1yBVBSN4dTTStU3Yyqu7GJ694xC4CpIL5ca3XzEny6eAjLUGwTjwZAA1FAswMY6yDrXqgzNDjxZ9v+EAQAvwb/oF0BDceIWQal6AoAAAAASUVORK5CYII=';

canvasElement.addEventListener('mouseup', function(mouseEvent) {
    const canvasRect = canvasElement.getBoundingClientRect();
    const mouseX = mouseEvent.clientX - canvasRect.left;
    const mouseY = mouseEvent.clientY - canvasRect.top;
    const x = mouseX - towerImage.width / 2;
    const y = mouseY - towerImage.height / 2;

    context.drawImage(towerImage, x, y);
});
