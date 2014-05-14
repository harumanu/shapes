define(['jquery', 'shapes/Shape', 'raphael'], function ( $, Shape, Raphael ) {

    var Circle = Shape.extend( 1 );

    /*var Circle = Shape.extend(function ( size ) {
        this.radius = size[0];
        this.area = this._calculateArea();
    });*/

    Circle.prototype._createShape = function () {
        var displayRadius = this.x * 40;
        var center = this._getCanvasCenter();
        this._renderCenterText(this.area.toFixed(2));
        this.renderText(center.x - displayRadius,  center.y - displayRadius,  'r = ' + this.x.toFixed(2), 12);
        this.shape = this.canvas.circle(center.x, center.y, displayRadius);
    };

    Circle.prototype._calculateArea = function () {
        return (2 * this.x * Math.PI);
    };

    return Circle;
});