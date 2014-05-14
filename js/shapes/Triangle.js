define(['jquery', 'shapes/Shape', 'raphael'], function ( $, Shape, Raphael ) {
    'use strict';
    var Triangle = Shape.extend( 1 );

    Triangle.prototype._createShape = function () {
        var displayWidth = this.x * 80;
        var displayHeight = Math.sqrt(3) / 2 * displayWidth;
        var center = this._getCanvasCenter();
        var xStart = center.x - displayWidth / 2;
        var yStart = center.y + displayHeight / 2;

        // Draw a custom triangle path
        this.shape = this.canvas.path([
            'M' + xStart,
            Math.round(yStart),
            Math.round(xStart + displayWidth),
            Math.round(yStart),
            Math.round(xStart + displayWidth / 2),
            Math.round(yStart - displayHeight),
            Math.round(xStart),
            Math.round(yStart) + 'z'].join(',')
        );

        this.renderText(center.x, yStart - displayHeight / 3, this.area.toFixed(2), 16);
        this.renderText(xStart + displayWidth / 2, yStart + 20, this.x.toFixed(2), 12);
    };

    Triangle.prototype._calculateArea = function () {
        return 1 / 4 * Math.sqrt(3) * Math.pow(this.x, 2);
    };

    return Triangle;
});