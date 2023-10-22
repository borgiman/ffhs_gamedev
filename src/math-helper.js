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
}
