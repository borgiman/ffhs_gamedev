export default class MathHelper {
    static getAngleBetweenPoints(p1, p2) {
        return Math.atan2(p1.y - p2.y, p1.x - p2.x);
    }

    static getDistanceBetweenPoints(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    static getPointAlongBezierCurve(percent, start, control, end) {
        return Math.pow(1 - percent,2) * start + 2 * (1 - percent) * percent * control + Math.pow(percent,2) * end;
    }

    static getDeltaMovementFromPointToPoint(speed, here, there, delta) {
        const xDiff = here.x - there.x;
        const yDiff = here.y - there.y;
        const xDiffAbsolute = Math.abs(xDiff);
        const yDiffAbsolute = Math.abs(yDiff);
        const xFactor = xDiffAbsolute > yDiffAbsolute ? 1 : xDiffAbsolute / yDiffAbsolute;
        const yFactor = xDiffAbsolute > yDiffAbsolute ? yDiffAbsolute / xDiffAbsolute : 1;
        const deltaX = xFactor * speed * delta;
        const deltaY = yFactor * speed * delta;
        const x = xDiff > 0 ? -deltaX : deltaX;
        const y = yDiff > 0 ? -deltaY : deltaY;
        return { x, y };
    }

    static hasIntersection(rect1, rect2) {
        return !(rect2.left > rect1.right ||
            rect2.right < rect1.left ||
            rect2.top > rect1.bottom ||
            rect2.bottom < rect1.top);
    }
}
